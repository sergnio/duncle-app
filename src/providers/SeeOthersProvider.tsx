import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import useAuth from "../hooks/Auth/useAuth";
import { addOrRemove } from "../utils/arrays";

interface SeeOthersContextState {
  checked: string[];
  toggleCheckbox(event: React.ChangeEvent<HTMLInputElement>): void;
}

export const SeeOthersContext = createContext<
  SeeOthersContextState | undefined
>(undefined);

const SeeOthersProvider = ({ children }: PropsWithChildren<any>) => {
  const { getAuthenticatedUser } = useAuth();
  const user = getAuthenticatedUser();
  const [checked, setChecked] = useState<string[]>([user?._id]);

  const toggleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    /** When this changes, we should add/remove some data from the table */
    console.log(addOrRemove(checked, event.target.name));
    setChecked(addOrRemove(checked, event.target.name));
  };

  return (
    <SeeOthersContext.Provider
      value={{
        checked,
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
