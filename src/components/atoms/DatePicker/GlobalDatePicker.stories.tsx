import React from "react";
import useGlobalDatePicker from "./useGlobalDatePicker";
import GlobalProvider from "../../../providers/GlobalProvider";
import GlobalDatePicker from "./GlobalDatePicker";
import { LocalStorageMockProvider } from "../../storybook-mocks/MockProviders";

export default {
  title: "Atoms/GlobalDatePicker",
};

export const Default = () => {
  return (
    <GlobalProvider>
      <LocalStorageMockProvider>
        <GlobalDatePicker />
        <OpenButton />
      </LocalStorageMockProvider>
    </GlobalProvider>
  );
};

const OpenButton = () => {
  const { handleOpen } = useGlobalDatePicker();

  return (
    <button onClick={() => handleOpen("email")} type="button">
      Click me to open the date picker!
    </button>
  );
};
