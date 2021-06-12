import React from "react";
import Drawer from "./ContactDrawer";
import { newLibrary } from "../../storybook-mocks/constants";
import MockForm from "../../storybook-mocks/MockForm";
import { action } from "@storybook/addon-actions";
import GlobalProvider from "../../../common/providers/GlobalProvider";

export default {
  title: "Elements/Drawer",
  component: Drawer,
};

export const Default = () => (
  <GlobalProvider
    value={{
      saveLibrary: () => action("Calling mock saveLibrary"),
      getAuthenticatedUser: () => action("Calling mock getAuthenticatedUser"),
    }}
  >
    <MockForm>
      <Drawer
        library={newLibrary}
        handleScheduleNextAppointment={action("Submitted")}
      />
    </MockForm>
  </GlobalProvider>
);
