import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { allTerritoriesKey, deleteTerritoryKey } from "../constants/queryKeys";
import Territory from "../model/territory";
import { createTerritoriesDatabaseV2 } from "../services/territoriesPouchService";
import PouchDB from "pouchdb";
import { useNotification } from "../components/atoms/Snackbar/Snackbar";
import { PouchResponse } from "./queriesUtils";

export default () => {
  const { deleteWithRevs } = createTerritoriesDatabaseV2();
  const queryClient = useQueryClient();

  const { setError } = useNotification();

  const deleteTerritory = (
    territory: Territory
  ): Promise<PouchDB.Core.Response | void> => deleteWithRevs(territory);

  return useMutation(deleteTerritoryKey, deleteTerritory, {
    onMutate: (territory) => {
      console.log("delete territory", territory);
      const previousList: PouchResponse<Territory> | undefined =
        queryClient.getQueryData(allTerritoriesKey);
      const newList = previousList.rows.filter(
        (t) => t.doc._id !== territory._id
      );
      queryClient.setQueryData(allTerritoriesKey, () => newList);

      return { previousList };
    },
    onError: (error, territory, { previousList }) => {
      console.error(error);
      setError(
        `Failed to update ${territory.name} with rep ${territory.repId}`
      );
      queryClient.setQueryData(allTerritoriesKey, () => previousList);
    },
    onSettled: () => {
      queryClient.invalidateQueries(allTerritoriesKey);
    },
  });
};
