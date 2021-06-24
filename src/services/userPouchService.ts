import { createDatabaseWithUser } from "../common/hooks/UsePouch";
import PouchDB from "pouchdb";
import UserDAO from "../model/userDAO";

/**
 * Don't use this outside of usePouch or userPouchService
 */
export const createUserDatabase = () => createDatabaseWithUser("user");

export const getAllUserDatabases = async (): Promise<string[]> => {
  /*
        1. Loop through the users DB
        2. Check each of them for a !404(?)
        3. Filter out any without the _test suffix
       */
  const localPouch = createUserDatabase();
  const { rows }: PouchDB.Core.AllDocsResponse<UserDAO> =
    await localPouch.allDocs();
  return rows.map(({ id }) => id);
};
