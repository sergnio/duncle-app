import React from "react";
import { ContactButtonsRow } from "./DPButtons";
import GlobalProvider from "../../../common/providers/GlobalProvider";
import { LocalStorageMockProvider } from "../../storybook-mocks/MockProviders";

export default {
  title: "Atoms/DatePickerButtons",
};

export const Default = () => (
  <GlobalProvider>
    <LocalStorageMockProvider>
      <ContactButtonsRow />
    </LocalStorageMockProvider>
  </GlobalProvider>
);
