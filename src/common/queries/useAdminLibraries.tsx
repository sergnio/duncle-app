import React from "react";
import { useQuery } from "react-query";
import { allLibrariesKey } from "../constants/queryKeys";
import { usePouch, USER_DB_PREFIX } from "../hooks/UsePouch";
import { AllLibrariesResponse, parseToLibraries } from "./queriesUtils";
import Library from "../../model/library";
import { useNotification } from "../../components/atoms/Snackbar/Snackbar";

export default (user: string) => {
  const { setError } = useNotification();

  // todo - use the same function that cuts off the rest of the email, and only gets the DB name, instead of doing this way?
  const localPouch = usePouch(`${USER_DB_PREFIX}${user}`);

  const fetchAllLibraries = (): AllLibrariesResponse =>
    localPouch.allDocs({ include_docs: true });

  return useQuery([allLibrariesKey, user], fetchAllLibraries, {
    select: (response: AllLibrariesResponse): Library[] =>
      parseToLibraries(response),
    onError: () => {
      setError(`Failed to get list of all libraries for ${user}.`);
    },
  });
};
