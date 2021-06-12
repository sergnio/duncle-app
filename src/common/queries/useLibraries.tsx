import { usePouch, USER_DB_PREFIX } from "../hooks/UsePouch";
import { useQuery } from "react-query";
import { useNotification } from "../../components/atoms/Snackbar/Snackbar";
import useAuth from "../hooks/Auth/useAuth";
import { allLibrariesKey } from "../constants/queryKeys";
import Library from "../../model/library";
import { AllLibrariesResponse, parseToLibraries } from "./queriesUtils";

export default () => {
  const { getAuthenticatedUser } = useAuth();
  const { setError } = useNotification();

  const currentUser = getAuthenticatedUser()?.username;

  const localPouch = usePouch(`${USER_DB_PREFIX}${currentUser}`);

  const fetchAllLibraries = (): AllLibrariesResponse =>
    localPouch.allDocs({ include_docs: true });

  return useQuery([allLibrariesKey, currentUser], fetchAllLibraries, {
    select: (response: AllLibrariesResponse): Library[] =>
      parseToLibraries(response),
    onError: () => {
      setError(`Failed to get list of all libraries. Try again`);
    },
  });
};
