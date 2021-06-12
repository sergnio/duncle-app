import { Library } from "../../model";
import { isEmpty, isEqual } from "lodash";
import { roundDecimals, usePouch } from "../hooks/UsePouch";
import { useMutation, useQueryClient } from "react-query";
import { useNotification } from "../../components/atoms/Snackbar/Snackbar";
import useAuth from "../hooks/Auth/useAuth";
import {
  allLibrariesKey,
  libraryKey,
  saveLibraryKey,
} from "../constants/queryKeys";
import { useLibraryState } from "../providers/LibraryProvider";
import { NoLibrary as DEFAULT_LIBRARY } from "../../components/storybook-mocks/constants";
import { updateAllLibrariesQuery } from "./queriesUtils";
import PouchDB from "pouchdb";

export default () => {
  const { currentLibrary } = useLibraryState();
  const { getAuthenticatedUser } = useAuth();
  const { setSuccess, setError, setInfo } = useNotification();
  const queryClient = useQueryClient();

  const USER_DB_PREFIX = "user_";
  const localPouch = usePouch(
    `${USER_DB_PREFIX}${getAuthenticatedUser()?.username}`
  );

  /**
   * Saves a library
   * @param library ** IMPORTANT ** make sure you're creating a clone of the library because we use the existing library
   * as a comparison.
   * This is to be re-worked once I am smarter :)
   */
  const saveLibrary = (
    library: Library
  ): Promise<PouchDB.Core.Response | void> => {
    // this is done just to get the _rev and _id, since our form doesn't store that info
    library = { ...currentLibrary, ...library };

    console.log("calling save library");

    if (library === DEFAULT_LIBRARY) {
      throw new Error(
        `Error code: 50. Default library is set. Cannot save library`
      );
    }
    if (isEmpty(library._rev) || library._rev === "norev") {
      throw new Error(`Error code: 51. _rev is undefined. Cannot save library`);
    }
    if (isEmpty(library._id) || library._id === "noid") {
      throw new Error(`Error code: 52. _id is undefined. Cannot save library`);
    }

    roundDecimals(library);

    if (!isEqual(currentLibrary, library)) {
      console.log("doing a put");
      console.log({ currentLibrary });
      console.log({ library });
      return localPouch.put(library);
    } else {
      console.warn("noop");
      setInfo("Library is the same - no updates were made");
      // no op promise, just so the types don't complain.. probably a better way to do this
      return Promise.resolve();
    }
  };

  return useMutation(saveLibraryKey, saveLibrary, {
    onSuccess: (response, library) => {
      let updatedLibrary: Library;
      console.log("success");

      if (response) {
        // update the query for the single library
        updatedLibrary = {
          ...library,
          _rev: response.rev,
          _id: response.id,
        };
        console.log("id", response.id);
        queryClient.setQueryData(libraryKey(response.id), updatedLibrary);

        // update the query for all libraries
        updateAllLibrariesQuery(updatedLibrary, queryClient);
        setSuccess("Successfully saved library");
      }
    },
    onError: (e, library) => {
      console.error("save error library", library);
      setError(`${e}`);
    },
    onSettled: (response) => {
      console.log("settled");

      if (response) {
        console.log(
          `invalidated: ${libraryKey(response.id)} and ${allLibrariesKey}`
        );
        queryClient.invalidateQueries(libraryKey(response.id));
        queryClient.invalidateQueries(allLibrariesKey);
      }
    },
  });
};
