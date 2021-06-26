import { createDatabaseWithUser } from "../hooks/UsePouch";
import { useQuery } from "react-query";
import { useNotification } from "../components/atoms/Snackbar/Snackbar";
import { allUsersKey } from "../constants/queryKeys";
import PouchDB from "pouchdb";
import { PouchResponse } from "./queriesUtils";
import UserDAO from "../model/userDAO";

export default () => {
  const { setError } = useNotification();

  const database = "user";
  const localPouch = createDatabaseWithUser(database);

  const fetchAll = (): PouchResponse<UserDAO> =>
    localPouch.allDocs({ include_docs: true });

  return useQuery(allUsersKey, fetchAll, {
    onError: (err: PouchDB.Core.Error): PouchDB.Core.Error => {
      setError(`Couldn't find users for database: ${database}`);
      return err;
    },
  });
};
