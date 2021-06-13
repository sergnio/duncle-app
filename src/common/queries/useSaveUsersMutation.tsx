import { isEmpty, isEqual } from "lodash";
import { createDatabaseWithUser } from "../hooks/UsePouch";
import { useMutation, useQueryClient } from "react-query";
import { useNotification } from "../../components/atoms/Snackbar/Snackbar";
import useAuth from "../hooks/Auth/useAuth";
import { saveUserKey } from "../constants/queryKeys";
import PouchDB from "pouchdb";
import UserDAO from "../../model/userDAO";

export default () => {
  const { getAuthenticatedUser } = useAuth();
  const { setSuccess, setError, setInfo } = useNotification();
  const queryClient = useQueryClient();

  const localPouch = createDatabaseWithUser("user");

  /**
   * Saves a user
   * @param user ** IMPORTANT ** make sure you're creating a clone of the user because we use the existing user
   * as a comparison.
   * This is to be re-worked once I am smarter :)
   */
  const saveUser = (user: UserDAO): Promise<PouchDB.Core.Response | void> => {
    const currentUser = getAuthenticatedUser();
    // this is done just to get the _rev and _id, since our form doesn't store that info
    user = { ...currentUser, ...user };
    console.log("calling save user");

    if (isEmpty(user._rev) || user._rev === "norev") {
      throw new Error(`Error code: 51. _rev is undefined. Cannot save user`);
    }
    if (isEmpty(user._id) || user._id === "noid") {
      throw new Error(`Error code: 52. _id is undefined. Cannot save user`);
    }

    if (!isEqual(currentUser, user)) {
      console.log({ currentUser });
      console.log({ user });
      return localPouch.put(user);
    } else {
      console.warn("noop");
      setInfo("User is the same - no updates were made");
      // no op promise, just so the types don't complain.. probably a better way to do this
      return Promise.resolve();
    }
  };

  return useMutation(saveUserKey, saveUser, {
    onSuccess: (response, user) => {
      // let updatedLibrary: Library;
      // console.log("success");
      //
      // if (response) {
      //   // update the query for the single user
      //   updatedLibrary = {
      //     ...user,
      //     _rev: response.rev,
      //     _id: response.id,
      //   };
      //   console.log("id", response.id);
      //   queryClient.setQueryData(userKey(response.id), updatedLibrary);
      //
      //   // update the query for all libraries
      //   updateAllLibrariesQuery(updatedLibrary, queryClient);
      setSuccess("Successfully saved user");
      // }
    },
    onError: (e, user) => {
      console.error("save error user", user);
      setError(`${e}`);
    },
    onSettled: (response) => {
      console.log("settled");
      // if (response) {
      //   console.log(
      //     `invalidated: ${userKey(response.id)} and ${allLibrariesKey}`
      //   );
      //   queryClient.invalidateQueries(userKey(response.id));
      //   queryClient.invalidateQueries(allLibrariesKey);
      // }
    },
  });
};
