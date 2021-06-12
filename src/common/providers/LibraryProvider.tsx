import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Library from "../../model/library";
import { NoLibrary } from "../../components/storybook-mocks/constants";

interface LibraryContextState {
  currentLibrary: Library;
  setCurrentLibrary: Dispatch<SetStateAction<Library>>;
}

export const LibraryContext = createContext<LibraryContextState | undefined>(
  undefined
);

export const LibraryProvider = ({ children }: PropsWithChildren<any>) => {
  const [currentLibrary, setCurrentLibrary] = useState<Library>(NoLibrary);

  return (
    <LibraryContext.Provider
      value={{
        currentLibrary,
        setCurrentLibrary,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

/**
 * WARNING: This should only be used in the useLibrary hook.
 * Use the functions provided in useLibrary instead
 */
export function useLibraryState() {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error("useLibraryState must be used within the LibraryProvider");
  }

  return context;
}
