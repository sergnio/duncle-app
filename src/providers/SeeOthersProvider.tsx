import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import useAuth from "../hooks/Auth/useAuth";
import without from "lodash/without";
import useLocalStorage from "../hooks/useLocalStorage";

interface SeeOthersContextState {
  selectedUsers: string[];
  toggleCheckbox(event: React.ChangeEvent<HTMLInputElement>): void;
}

export const SeeOthersContext = createContext<
  SeeOthersContextState | undefined
>(undefined);

const SeeOthersProvider = ({ children }: PropsWithChildren<any>) => {
  const { getAuthenticatedUser } = useAuth();
  const user = getAuthenticatedUser();
  const { storedValue: selectedUsers, setValue: setSelectedUsers } =
    useLocalStorage<string[]>("checkboxes", [user?._id]);

  const toggleCheckbox = ({
    target: { name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const value = selectedUsers.find((e) => e === name);

    /** When this changes, we should add/remove some data from the table */
    const newList = value
      ? without(selectedUsers, value)
      : [name, ...selectedUsers];
    setSelectedUsers(newList);
  };

  return (
    <SeeOthersContext.Provider
      value={{
        selectedUsers,
        toggleCheckbox,
      }}
    >
      {children}
    </SeeOthersContext.Provider>
  );
};

export const useSeeOthersState = () => {
  const context = useContext(SeeOthersContext);
  if (context === undefined) {
    throw new Error(
      "useSeeOthersState must be used within the SeeOthersProvider"
    );
  }

  return context;
};

export default SeeOthersProvider;
