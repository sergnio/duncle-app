import React from "react";
import ViewLibrary from "./ViewLibrary";
import { MockViewLibraryProvider } from "../../storybook-mocks/MockProviders";

export default {
  title: "Pages/ViewLibrary",
  component: ViewLibrary,
};

export const Default = () => (
  <MockViewLibraryProvider>
    <ViewLibrary />
  </MockViewLibraryProvider>
);
