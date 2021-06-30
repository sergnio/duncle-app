import { isEmpty } from "lodash";
import { createDatabaseWithUser } from "../hooks/UsePouch";
import { useMutation, useQueryClient } from "react-query";
import { useNotification } from "../components/atoms/Snackbar/Snackbar";
import { allUsersKey, saveUserKey } from "../constants/queryKeys";
import PouchDB from "pouchdb";
import UserDAO from "../model/userDAO";
import { PouchResponse } from "./queriesUtils";
import useAuth from "../hooks/Auth/useAuth";

export default () => {
  const { setError } = useNotification();
  const queryClient = useQueryClient();
  const { authenticate } = useAuth();

  const localPouch = createDatabaseWithUser("user");

  /**
   * Saves a user
   * @param user ** IMPORTANT ** make sure you're creating a clone of the user because we use the existing user
   * as a comparison.
   * This is to be re-worked once I am smarter :)
   */
  const saveUser = (user: UserDAO): Promise<PouchDB.Core.Response | void> => {
    console.log("editedUser", user._rev);
    console.log("editedUser", user.events);

    if (isEmpty(user._rev) || user._rev === "norev") {
      throw new Error(`Error code: 51. _rev is undefined. Cannot save user`);
    }
    if (isEmpty(user._id) || user._id === "noid") {
      throw new Error(`Error code: 52. _id is undefined. Cannot save user`);
    }

    console.log({ user });
    return localPouch.put(user);
  };

  return useMutation(saveUserKey, saveUser, {
    onSuccess: (response, user) => {
      let updatedUser: UserDAO[];

      if (response) {
        // update the query for the single user
        updatedUser = [
          {
            ...user,
            _rev: response.rev,
          },
        ];

        const oldData: PouchResponse<UserDAO[]> =
          queryClient.getQueryData<PouchResponse<UserDAO[]>>(allUsersKey);

        const newData = oldData.rows.map(
          (obj) => updatedUser.find((o) => o._id === obj.id) || obj
        );

        queryClient.setQueryData(allUsersKey, newData);
        // todo - replace with reactQuery handling all the data, and the local storage just holding the
        //  id / email to reference the queried data.
        authenticate(updatedUser[0]);
      }
    },
    onError: (e, user) => {
      console.error("save error user", user);
      setError(`${e}`);
    },
    onSettled: (response) => {
      console.log("settled");
      if (response) {
        console.log(`invalidated: ${allUsersKey}`);
        queryClient.invalidateQueries(allUsersKey);
      }
    },
  });
};
