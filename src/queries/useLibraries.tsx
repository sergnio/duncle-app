import {useQueries, useQuery} from "react-query";
import { useNotification } from "../components/atoms/Snackbar/Snackbar";
import useAuth from "../hooks/Auth/useAuth";
import { allLibrariesKey } from "../constants/queryKeys";
import Library from "../model/library";
import { parseFromPouchResponse, PouchResponse } from "./queriesUtils";
import { createLibraryDatabase } from "../services/librariesPouchService";

interface Props {
  userIds?: string[]
}

export default ({userIds}: Props) => {
  const { getAuthenticatedUser, isAdmin } = useAuth();
  const { setError } = useNotification();

  const user = getAuthenticatedUser();
  const currentUser = user?.username;
  const userId = user._id;

  const users: string[] = userIds && userIds.length > 0 ? userIds : [userId]

  const localPouch = createLibraryDatabase();

  const fetchAllLibraries = (): PouchResponse =>
    isAdmin
      ? localPouch.allDocs({ include_docs: true })
      : localPouch.allDocs({ include_docs: true });

  useQueries(users.map(userId => {
    return {
      queryKey: ['userLibrary', userId],
      queryFn: () => fetchAllLibraries(userId),
    }
  })
)

  return useQuery([allLibrariesKey, currentUser], fetchAllLibraries, {
    select: (response: PouchResponse): Library[] =>
      isAdmin
        ? parseFromPouchResponse(response) // todo - .filter(l => filter.includes(l.assignedRep))
        : parseFromPouchResponse(response).filter(
            (l) => l.assignedRep === userId
          ),
    onError: () => {
      setError(`Failed to get list of all libraries. Try again`);
    },
  });
};
