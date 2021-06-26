import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface CheckboxesState {
  checkedUser: boolean;
  checkedSam: boolean;
  checkedJim: boolean;
}

interface SeeOthersContextState {
  checked: CheckboxesState;
  setChecked: Dispatch<SetStateAction<CheckboxesState>>;
}

export const SeeOthersContext = createContext<
  SeeOthersContextState | undefined
>(undefined);

const SeeOthersProvider = ({ children }: PropsWithChildren<any>) => {
  const [checked, setChecked] = useState<CheckboxesState>({
    checkedUser: true,
    checkedSam: false,
    checkedJim: false,
  });

  return (
    <SeeOthersContext.Provider
      value={{
        checked,
        setChecked,
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
