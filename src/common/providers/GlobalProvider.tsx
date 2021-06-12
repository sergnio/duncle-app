import React, { PropsWithChildren } from "react";
import { LibraryProvider } from "./LibraryProvider";
import { NotificationProvider } from "./NotificationProvider";
import { GlobalDatePickerProvider } from "./GlobalDatePickerProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default ({ children }: PropsWithChildren<any>) => (
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <GlobalDatePickerProvider>
        <LibraryProvider>{children}</LibraryProvider>
      </GlobalDatePickerProvider>
    </NotificationProvider>
  </QueryClientProvider>
);
