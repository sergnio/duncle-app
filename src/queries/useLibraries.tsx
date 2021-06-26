import { useQuery } from "react-query";
import { useNotification } from "../components/atoms/Snackbar/Snackbar";
import useAuth from "../hooks/Auth/useAuth";
import { allLibrariesKey } from "../constants/queryKeys";
import Library from "../model/library";
import { parseToLibraries, PouchResponse } from "./queriesUtils";
import { createLibraryDatabase } from "../services/librariesPouchService";

export default () => {
  const { getAuthenticatedUser, isAdmin } = useAuth();
  const { setError } = useNotification();

  const user = getAuthenticatedUser();
  const currentUser = user?.username;
  const userId = user._id;

  const localPouch = createLibraryDatabase();

  const fetchAllLibraries = (): PouchResponse =>
    isAdmin
      ? localPouch.allDocs({ include_docs: true })
      : localPouch.allDocs({ include_docs: true });

  return useQuery([allLibrariesKey, currentUser], fetchAllLibraries, {
    select: (response: PouchResponse): Library[] =>
      isAdmin
        ? parseToLibraries(response) // todo - .filter(l => filter.includes(l.assignedRep))
        : parseToLibraries(response).filter((l) => l.assignedRep === userId),
    onError: () => {
      setError(`Failed to get list of all libraries. Try again`);
    },
  });
};
