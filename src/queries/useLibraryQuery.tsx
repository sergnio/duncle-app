import { useQuery } from "react-query";
import { useNotification } from "../components/atoms/Snackbar/Snackbar";
import { libraryKey } from "../constants/queryKeys";
import { useLibraryState } from "../providers/LibraryProvider";
import PouchDB from "pouchdb";
import { createLibraryDatabase } from "../services/librariesPouchService";
import { parseFromPouchResponse, PouchResponse } from "./queriesUtils";
import { Library } from "../model";

export default (uuid: string) => {
  const { setCurrentLibrary } = useLibraryState();
  const { setError } = useNotification();

  const localPouch = createLibraryDatabase();

  const fetchAll = (): PouchResponse =>
    localPouch.allDocs({ include_docs: true });

  return useQuery(libraryKey(uuid), fetchAll, {
    select: (response: PouchResponse) =>
      // todo - refactor this into generic method like getUserData from queriesUtils.ts
      parseFromPouchResponse<Library>(response).filter(
        (l) => l._id === uuid
      )[0],
    onSuccess: (library) => {
      setCurrentLibrary(library);
      return library;
    },
    onError: (err: PouchDB.Core.Error): PouchDB.Core.Error => {
      setError(`Couldn't find a matching record for ID: ${uuid}`);
      return err;
    },
  });
};
