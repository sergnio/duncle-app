import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Color as Severity } from "@material-ui/lab/Alert/Alert";

interface NotificationContextState {
  message: SnackbarStateProps;
  setMessage: Dispatch<SetStateAction<SnackbarStateProps>>;
}

export interface SnackbarStateProps {
  message: string;
  severity: Severity;
}

export const initialState: SnackbarStateProps = {
  message: "",
  severity: "success",
};

export const NotificationContext = createContext<
  NotificationContextState | undefined
>(undefined);

export const NotificationProvider = ({ children }: PropsWithChildren<any>) => {
  const [message, setMessage] = useState<SnackbarStateProps>(initialState);

  return (
    <NotificationContext.Provider
      value={{
        message,
        setMessage,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * WARNING: This should only be used in the useNotification hook.
 * Use the functions provided in useNotification instead
 */
export function useNotificationState() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationState must be used within the NotificationProvider"
    );
  }

  return context;
}
