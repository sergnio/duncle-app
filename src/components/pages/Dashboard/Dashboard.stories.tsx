import React from "react";
import AllLibraries from "./Dashboard";
import GlobalProvider from "../../../providers/GlobalProvider";
import { LocalStorageMockProvider } from "../../storybook-mocks/MockProviders";

export default {
  title: "Pages/Dashboard",
};

export const Default = () => (
  <GlobalProvider>
    <LocalStorageMockProvider>
      <AllLibraries />
    </LocalStorageMockProvider>
  </GlobalProvider>
);
