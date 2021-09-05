import { useQuery, useQueryClient } from "react-query";
import { useNotification } from "../components/atoms/Snackbar/Snackbar";
import useAuth from "../hooks/Auth/useAuth";
import { allLibrariesKey, allTerritoriesKey } from "../constants/queryKeys";
import Library from "../model/library";
import { parseFromPouchResponse, PouchResponse } from "./queriesUtils";
import { createLibraryDatabase } from "../services/librariesPouchService";
import Territory from "../model/territory";
import { unassignedLabel } from "../components/elements/AdminCheckboxes/AdminCheckboxes";
import useTerritoriesQuery from "./useTerritoriesQuery";

export default (userIds: string[] = []) => {
  const { getAuthenticatedUser, isAdmin } = useAuth();
  const { data: territoriesResponse, isSuccess } = useTerritoriesQuery();
  const { setError } = useNotification();
  const qc = useQueryClient();

  const user = getAuthenticatedUser();
  const userId = user?._id;

  const localPouch = createLibraryDatabase();

  return useQuery(
    allLibrariesKey,
    (): PouchResponse => localPouch.allDocs({ include_docs: true }),
    {
      // wait until territories is done
      enabled: isSuccess,
      select: (response: PouchResponse): Library[] => {
        let validTerritories: string[] = [];

        // if the passed in user ID matches the userId for the lib territoryId, then return

        validTerritories = territoriesResponse
          // only get the territories that match the passed in userIds
          .filter((t) => userIds.includes(t.repId))
          // then return JUST the id
          .map((t) => t._id);
        let adminLibraries = parseFromPouchResponse(response).filter((l) =>
          validTerritories.includes(l.territoryId)
        );

        // get unassigned libs if the checkbox is checked
        if (userIds.includes(unassignedLabel)) {
          const unassignedLibs = parseFromPouchResponse(response).filter(
            (l) => l.territoryId == null
          );
          adminLibraries = [...unassignedLibs, ...adminLibraries];
        }

        return isAdmin
          ? adminLibraries
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
