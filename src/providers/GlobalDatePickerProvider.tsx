import React, {
  createContext,
  Dispatch,
  MutableRefObject,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";

interface GlobalDatePickerContextState {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  noteMessage: MutableRefObject<string | undefined>;
}

export const GlobalDatePickerContext = createContext<
  GlobalDatePickerContextState | undefined
>(undefined);

export const GlobalDatePickerProvider = ({
  children,
}: PropsWithChildren<any>) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const noteMessage = useRef<string | undefined>();

  return (
    <GlobalDatePickerContext.Provider
      value={{
        isOpen,
        setOpen,
        noteMessage,
      }}
    >
      {children}
    </GlobalDatePickerContext.Provider>
  );
};

/**
 * WARNING: This should only be used in the useGlobalDatePicker hook.
 * Use the functions provided in useGlobalDatePicker instead
 */
export function useGlobalDatePickerState() {
  const context = useContext(GlobalDatePickerContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalDatePickerState must be used within the GlobalDatePickerProvider"
    );
  }

  return context;
}
