import { useQuery } from "react-query";
import { useNotification } from "../components/atoms/Snackbar/Snackbar";
import { allTerritoriesKey } from "../constants/queryKeys";
import { parseFromPouchResponse, PouchResponse } from "./queriesUtils";
import { createTerritoriesDatabase } from "../services/territoriesPouchService";
import Territory from "../model/territory";

export default () => {
  const { setError } = useNotification();

  const localPouch = createTerritoriesDatabase();

  const fetchAll = (): PouchResponse<Territory> =>
    localPouch.allDocs({ include_docs: true });

  return useQuery(allTerritoriesKey, fetchAll, {
    select: (response: PouchResponse<Territory>): Territory[] => {
      console.log(response);
      return parseFromPouchResponse<Territory>(response);
    },
    onError: () => {
      setError(`Failed to get list of all territories. Try again`);
    },
  });
};
