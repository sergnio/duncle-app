import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { allTerritoriesKey, saveTerritoriesKey } from "../constants/queryKeys";
import PouchDB from "pouchdb";
import { isEmpty } from "lodash";
import { createTerritoriesDatabase } from "../services/territoriesPouchService";
import { useNotification } from "../components/atoms/Snackbar/Snackbar";
import Territory from "../model/territory";
import { PouchResponse } from "./queriesUtils";

export interface Props {
  territory: Territory;
  isExisting?: boolean;
}

export default () => {
  const { setError } = useNotification();
  const queryClient = useQueryClient();
  const localPouch = createTerritoriesDatabase();

  /**
   * Saves a territory
   * @param territory ** IMPORTANT ** make sure you're creating a clone of the territory because we use the existing user
   * as a comparison.
   * @param isExisting - if the parameter being passed already exists
   */
  // todo - very easily should make this generic
  const saveTerritory = ({
    territory,
    isExisting = true,
  }: Props): Promise<PouchDB.Core.Response | void> => {
    console.log("editedTerritory", territory._rev);

    if (isExisting && (isEmpty(territory._rev) || territory._rev === "norev")) {
      throw new Error(
        `Error code: 51. _rev is undefined. Cannot save Territory`
      );
    }
    if (isExisting && (isEmpty(territory._id) || territory._id === "noid")) {
      throw new Error(
        `Error code: 52. _id is undefined. Cannot save Territory`
      );
    }

    console.log({ territory });
    return localPouch.put(territory);
  };

  return useMutation(saveTerritoriesKey, saveTerritory, {
    onSuccess: (response, { territory }) => {
      let updatedTerritory: Territory[];

      if (response) {
        // update the query for the single user
        updatedTerritory = [
          {
            ...territory,
            _id: response.id,
            _rev: response.rev,
          },
        ];

        const oldData: PouchResponse<Territory[]> =
          queryClient.getQueryData<PouchResponse<Territory[]>>(
            allTerritoriesKey
          );

        const newData = oldData.rows.map(
          (obj) => updatedTerritory.find((o) => o._id === obj.id) || obj
        );

        queryClient.setQueryData(allTerritoriesKey, newData);
      }
    },
    onError: (e, territory) => {
      console.error("save error territory", territory);
      setError(`${e}`);
    },
    onSettled: (response) => {
      console.log("settled");
      if (response) {
        console.log(`invalidated: ${allTerritoriesKey}`);
        queryClient.invalidateQueries(allTerritoriesKey);
      }
    },
  });
};
