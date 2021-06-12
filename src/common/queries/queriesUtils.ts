import { Library } from "../../model";
import { allLibrariesKey } from "../constants/queryKeys";
import { QueryClient } from "react-query";

export type AllLibrariesResponse = {
  rows: PouchRow[];
};

export type PouchRow = {
  doc: Library;
  id: string;
  key: string;
  value: {
    rev: string;
    deleted?: boolean;
  };
};
export const parseToLibraries = (response: AllLibrariesResponse) =>
  response.rows.map(({ doc }: PouchRow) => doc);

export const updateAllLibrariesQuery = (
  updatedLibrary: Library,
  queryClient: QueryClient
) => {
  if (queryClient.getQueryData(allLibrariesKey)) {
    queryClient.setQueryData(allLibrariesKey, (old) => {
      // @ts-ignore
      const previousLibraries = parseToLibraries(old);
      previousLibraries.map((d) =>
        d._id === updatedLibrary._id ? updatedLibrary : d
      );
    });
  }
};
