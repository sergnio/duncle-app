import { useQuery } from "react-query";
import { useNotification } from "../components/atoms/Snackbar/Snackbar";
import { allUsersKey } from "../constants/queryKeys";
import PouchDB from "pouchdb";
import { parseFromPouchResponse, PouchResponse } from "./queriesUtils";
import UserDAO from "../model/userDAO";
import useAuth from "../hooks/Auth/useAuth";
import { createUserDatabase } from "../services/userPouchService";

export default (explicitlyReturnAll = true, userIds: string[] = []) => {
  const { getAuthenticatedUser, isAdmin } = useAuth();
  const { setError } = useNotification();

  const user = getAuthenticatedUser();
  const userId = user?._id;

  const localPouch = createUserDatabase();

  const fetchAll = (): PouchResponse<UserDAO> =>
    localPouch.allDocs({ include_docs: true });

  // todo - future sergio, I just implemented the useLibraries on the dashboards and it worked incredibly.
  //  not sure why it's not working for this quite yet, but I'll get it to work
  //  one problem is that I'm using this query for both admin checkboxes AND for displaying which calendar events...
  return useQuery(allUsersKey, fetchAll, {
    select: (response: PouchResponse<UserDAO>): UserDAO[] =>
      explicitlyReturnAll
        ? parseFromPouchResponse<UserDAO>(response)
        : isAdmin
        ? parseFromPouchResponse<UserDAO>(response).filter((u) =>
            userIds.includes(u._id)
          )
        : parseFromPouchResponse<UserDAO>(response).filter(
            (u) => u._id === userId
          ),
    onError: (err: PouchDB.Core.Error): PouchDB.Core.Error => {
      setError(`Error code 31. Couldn't find users`);
      return err;
    },
  });
};
