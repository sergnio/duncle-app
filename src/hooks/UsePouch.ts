import PouchDB from "pouchdb";
import UserDAO from "../model/userDAO";
import Library from "../model/library";
import User from "../model/user";
import NewLibrary from "../model/newLibrary";
import { isEmpty } from "lodash";
import { createUserDatabase } from "../services/userPouchService";
import { createLibraryDatabase } from "../services/librariesPouchService";

export interface UseUserReturnProps {
  addUser(props: User): Promise<PouchDB.Core.Response | Error>;
  updateUser(props: UserDAO): Promise<PouchDB.Core.Response>;
  localPouch: any;
  fetchUser(props: any): any;
}

const USER_ID_PREFIX = "org.duncle.";
export const USER_DB_PREFIX = "user_";

export function useUserPouch(): UseUserReturnProps {
  const localPouch = createUserDatabase();

  async function fetchUser(inputEmail: string): Promise<UserDAO> {
    console.log(`Finding username: ${inputEmail}`);
    try {
      return await localPouch.get(`${USER_ID_PREFIX}${inputEmail}`);
    } catch (e) {
      if (e.status === 404) {
        throw new Error(`User not found ${inputEmail}`);
      }
      console.error("error:", e);
      throw new Error(`Error when making database call ${e}`);
    }
  }

  async function addUser(props: User): Promise<PouchDB.Core.Response | Error> {
    try {
      return await localPouch.put({
        _id: `${USER_ID_PREFIX}${props.email}`,
        ...props,
      });
    } catch (err) {
      if (err.status === 409) {
        return new Error("Email address is already in use");
      }
      console.error("Pouch error", err);
      // todo - gonna have to return this error
      return new Error(`Unable to save user: ${err}`);
    }
  }

  async function updateUser(props: UserDAO): Promise<PouchDB.Core.Response> {
    try {
      return await localPouch.put(props);
    } catch (err) {
      console.error(err);
      throw new Error(`Unable to save event: ${err}`);
    }
  }

  return { localPouch, addUser, fetchUser, updateUser };
}

class EnvVariableNotSetError extends Error {
  constructor(envVar: string) {
    super(`${envVar} is not properly set. 
        Please set up this environment variable to connect to a remote database`);
  }
}

interface useLibraryPouchReturn {
  getAll(): Promise<PouchDB.Core.AllDocsResponse<Library>>;
  getLibrary(libraryId: string): any;
  saveLibrary(library: Library): Promise<Library>;
  addNewLibrary(library: NewLibrary): Promise<Library>;
}

export function roundDecimals(library: Library | NewLibrary) {
  library.lastSale = Number(library.lastSale?.toFixed(2));
  library.totalSales = Number(library.totalSales?.toFixed(2));
}

export function useLibraryPouch(): useLibraryPouchReturn {
  const localPouch = createLibraryDatabase();

  async function getAll(): Promise<PouchDB.Core.AllDocsResponse<Library>> {
    try {
      return await localPouch.allDocs({ include_docs: true });
    } catch (err) {
      throw new Error("Failed to get all docs");
    }
  }

  async function getLibrary(
    libraryId: string
  ): Promise<PouchDB.Core.AllDocsResponse<Library>> {
    try {
      return await localPouch.get(libraryId);
    } catch (err) {
      throw new Error("Failed to get all docs");
    }
  }

  async function saveLibrary(library: Library): Promise<Library> {
    if (isEmpty(library._rev) || library._rev === "norev") {
      throw new Error(`Error code: 53. _rev is undefined. Cannot save library`);
    }
    if (isEmpty(library._id) || library._id === "noid") {
      throw new Error(`Error code: 51. _id is undefined. Cannot save library`);
    }
    try {
      roundDecimals(library);
      const response: PouchDB.Core.Response = await localPouch.put(library);
      return await localPouch.get(response.id);
    } catch (err) {
      throw new Error(`Failed to save the library: ${err}`);
    }
  }

  async function addNewLibrary(library: NewLibrary): Promise<Library> {
    try {
      roundDecimals(library);
      const response: PouchDB.Core.Response = await localPouch.put(library);
      return await localPouch.get(response.id);
    } catch (err) {
      throw new Error(`Failed to save the library: ${err}`);
    }
  }

  return { getAll, getLibrary, saveLibrary, addNewLibrary };
}

export function createDatabaseWithUser(database: string): any {
  const localPouch: PouchDB.Database = new PouchDB(database);

  const remoteDb = process.env.REACT_APP_DATABASE_URL;
  const dbUsername = process.env.REACT_APP_DATABASE_USERNAME;
  const dbPassword = process.env.REACT_APP_DATABASE_PASSWORD;

  if (!remoteDb) {
    throw new EnvVariableNotSetError("REACT_APP_DATABASE_URL");
  }
  if (!dbUsername) {
    throw new EnvVariableNotSetError("REACT_APP_DATABASE_USERNAME");
  }
  if (!dbPassword) {
    throw new EnvVariableNotSetError("REACT_APP_DATABASE_PASSWORD");
  }

  const remoteDatabase: PouchDB.Database = new PouchDB(
    `https://${dbUsername}:${dbPassword}@${remoteDb}/${database}`
  );

  // Setup database sync
  // Read more at https://pouchdb.com/guides/replication.html
  localPouch
    .sync(remoteDatabase, {
      live: true,
      retry: true,
    })
    .on("change", function () {
      // console.log('db changed');
    })
    .on("error", function () {
      // console.log('sync error');
    });

  return localPouch;
}
