import { createDatabaseWithUser } from "../common/hooks/UsePouch";

/**
 * Don't use this outside of usePouch or userPouchService
 */
export const createUserDatabase = () => createDatabaseWithUser("user");

export const getAllUserDatabases = async () => {
  const localPouch = createUserDatabase();
  const x = await localPouch.allDocs();
  console.log({ x });
  /*
        1. Loop through the users DB
        2. Check each of them for a !404(?)
        3. Filter out any without the _test suffix
       */
};
