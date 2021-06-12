import { usePouch } from "../hooks/UsePouch";
import { useQuery } from "react-query";
import { useNotification } from "../../components/atoms/Snackbar/Snackbar";
import useAuth from "../hooks/Auth/useAuth";
import { libraryKey } from "../constants/queryKeys";
import { useLibraryState } from "../providers/LibraryProvider";

export default (uuid: string) => {
  const { getAuthenticatedUser } = useAuth();
  const { setCurrentLibrary } = useLibraryState();
  const { setError } = useNotification();

  const USER_DB_PREFIX = "user_";
  const localPouch = usePouch(
    `${USER_DB_PREFIX}${getAuthenticatedUser()?.username}`
  );

  const fetchSingleDoc = () => localPouch.get(uuid);

  return useQuery(libraryKey(uuid), fetchSingleDoc, {
    onSuccess: (library) => {
      setCurrentLibrary(library);
      return library;
    },
    onError: (err: PouchDB.Core.Error): PouchDB.Core.Error => {
      setError(`Couldn't find a matching record for ID: ${uuid}`);
      return err;
    },
  });
};
