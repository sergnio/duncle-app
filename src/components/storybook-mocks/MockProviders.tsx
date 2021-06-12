import { dummyUserDAO, mockToken, newLibrary } from "./constants";
import React, { PropsWithChildren } from "react";
// @ts-ignore
import { LocalStorageMock } from "@react-mock/localstorage";
import { QueryClient, QueryClientProvider } from "react-query";
import { NotificationProvider } from "../../common/providers/NotificationProvider";
import { LibraryProvider } from "../../common/providers/LibraryProvider";
import { BrowserRouter } from "react-router-dom";

export const LocalStorageMockProvider = ({
  children,
}: PropsWithChildren<any>) => (
  <LocalStorageMock items={{ authCredentials: mockToken }}>
    {children}
  </LocalStorageMock>
);

const queryClient = new QueryClient();

export const MockViewLibraryProvider = ({
  children,
}: PropsWithChildren<any>) => (
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <LocalStorageMockProvider>
        <LibraryProvider
          value={{
            currentLibrary: newLibrary,
            getAuthenticatedUser: () => dummyUserDAO,
          }}
        >
          <BrowserRouter>{children}</BrowserRouter>
        </LibraryProvider>
      </LocalStorageMockProvider>
    </NotificationProvider>
  </QueryClientProvider>
);
