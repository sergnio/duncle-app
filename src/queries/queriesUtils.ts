import { Library } from "../model";
import { allLibrariesKey } from "../constants/queryKeys";
import { QueryClient } from "react-query";
import UserDAO from "../model/userDAO";
import User from "../model/user";

export type PouchResponse<T = Library> = {
  rows: PouchRow<T>[];
};

export type PouchRow<T = Library> = {
  doc: T;
  id: string;
  key: string;
  value: {
    rev: string;
    deleted?: boolean;
  };
};
export const parseFromPouchResponse = <T = Library>(
  response: PouchResponse<T>
) => response.rows.map(({ doc }: PouchRow<T>) => doc);

export const updateAllLibrariesQuery = (
  updatedLibrary: Library,
  queryClient: QueryClient
) => {
  if (queryClient.getQueryData(allLibrariesKey)) {
    queryClient.setQueryData(allLibrariesKey, (old) => {
      // @ts-ignore
      const previousLibraries = parseFromPouchResponse(old);
      previousLibraries.map((d) =>
        d._id === updatedLibrary._id ? updatedLibrary : d
      );
    });
  }
};

export const getUserData = (
  user: "jim" | "sam" | string,
  userData: UserDAO[]
): UserDAO => userData.filter((d) => d.username === user)[0];

export const getUserEvents = (
  user: "jim" | "sam" | string,
  userData: UserDAO[]
) => getUserData(user, userData).events;
