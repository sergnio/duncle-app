import { useQuery, useQueryClient } from "react-query";
import { useNotification } from "../components/atoms/Snackbar/Snackbar";
import useAuth from "../hooks/Auth/useAuth";
import { allLibrariesKey, allTerritoriesKey } from "../constants/queryKeys";
import Library from "../model/library";
import { parseFromPouchResponse, PouchResponse } from "./queriesUtils";
import { createLibraryDatabase } from "../services/librariesPouchService";
import Territory from "../model/territory";

export default (userIds: string[] = []) => {
  const { getAuthenticatedUser, isAdmin } = useAuth();
  const { setError } = useNotification();
  const qc = useQueryClient();

  const user = getAuthenticatedUser();
  const userId = user?._id;

  const localPouch = createLibraryDatabase();

  return useQuery(
    allLibrariesKey,
    (): PouchResponse => localPouch.allDocs({ include_docs: true }),
    {
      select: (response: PouchResponse): Library[] => {
        let validTerritories: string[] = [];
        const territoriesResponse: PouchResponse<Territory> =
          qc.getQueryData(allTerritoriesKey);

        if (territoriesResponse) {
          const parsedTerritories = parseFromPouchResponse(territoriesResponse);
          // if the passed in user ID matches the userId for the lib territoryId, then return

          validTerritories = parsedTerritories
            // only get the territories that match the passed in userIds
            .filter((t) => userIds.includes(t.repId))
            // then return JUST the id
            .map((t) => t._id);
        }
        return isAdmin
          ? parseFromPouchResponse(response).filter((l) =>
              validTerritories.includes(l.territoryId)
            )
          : parseFromPouchResponse(response).filter(
              (l) => l.assignedRep === userId
            );
      },
      onError: () => {
        setError(`Failed to get list of all libraries. Try again`);
      },
    }
  );
};
