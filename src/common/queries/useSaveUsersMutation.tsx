import { isEmpty, isEqual } from "lodash";
import { createDatabaseWithUser } from "../hooks/UsePouch";
import { useMutation, useQueryClient } from "react-query";
import { useNotification } from "../../components/atoms/Snackbar/Snackbar";
import useAuth from "../hooks/Auth/useAuth";
import { allUsersKey, saveUserKey } from "../constants/queryKeys";
import PouchDB from "pouchdb";
import UserDAO from "../../model/userDAO";
import { getUserData, PouchResponse, PouchRow } from "./queriesUtils";

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
      console.log("success");

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
        // console.log({ oldData });
        // console.log({ updatedUser });

        const newData = oldData.rows.map(
          (obj) => updatedUser.find((o) => o._id === obj.id) || obj
        );
        // console.log({ newData });

        queryClient.setQueryData(allUsersKey, newData);
      }
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
