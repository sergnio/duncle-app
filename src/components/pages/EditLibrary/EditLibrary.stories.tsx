import React from "react";
import { newLibrary } from "../../storybook-mocks/constants";
import MockForm from "../../storybook-mocks/MockForm";
import EditLibraryController from "./EditLibraryController";
import { LibraryProvider } from "../../../common/providers/LibraryProvider";

export default {
  title: "Pages/EditLibrary",
};

export const Default = () => (
  <LibraryProvider value={{ currentLibrary: newLibrary }}>
    <MockForm>
      <EditLibraryController />
    </MockForm>
  </LibraryProvider>
);
