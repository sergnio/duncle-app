import { createDatabaseWithUser } from "../hooks/UsePouch";
import { isEmpty } from "lodash";

export const checkForRevs = <T>(obj: PouchDB.Core.ExistingDocument<T>) => {
  if (isEmpty(obj._rev) || obj._rev === "norev") {
    throw new Error(`Error code: 51. _rev is undefined. Cannot save`);
  }
  if (isEmpty(obj._id) || obj._id === "noid") {
    throw new Error(`Error code: 52. _id is undefined. Cannot save`);
  }
};

export const createTerritoriesDatabase = () =>
  createDatabaseWithUser("territories");

export const createTerritoriesDatabaseV2 = () => {
  const localPouch = createDatabaseWithUser("territories");

  const getWithRevs = <T>(obj: PouchDB.Core.ExistingDocument<T>) => {
    checkForRevs(obj);
    return localPouch.get(obj);
  };

  const deleteWithRevs = <T>(obj: PouchDB.Core.ExistingDocument<T>) => {
    checkForRevs(obj);
    return localPouch.remove(obj);
  };

  return { getWithRevs, deleteWithRevs };
};
