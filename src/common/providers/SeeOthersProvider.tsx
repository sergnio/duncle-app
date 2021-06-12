import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface CheckboxesState {
  checkedTerry: boolean;
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

const SeeOthersProvider: FC = ({ children }) => {
  const [checked, setChecked] = useState<CheckboxesState>({
    checkedTerry: true,
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
