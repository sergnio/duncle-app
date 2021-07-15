import React from "react";
import Dashboard from "./Dashboard";
import GlobalProvider from "../../../providers/GlobalProvider";
import { LocalStorageMockProvider } from "../../storybook-mocks/MockProviders";
import SeeOthersProvider from "../../../providers/SeeOthersProvider";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Pages/Dashboard",
};

export const Default = () => (
  <GlobalProvider>
    <LocalStorageMockProvider>
      <SeeOthersProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Dashboard manageTerritories={false} />
        </MemoryRouter>
      </SeeOthersProvider>
    </LocalStorageMockProvider>
  </GlobalProvider>
);
