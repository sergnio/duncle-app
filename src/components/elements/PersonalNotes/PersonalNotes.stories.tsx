import React from "react";
import PersonalNotes from "./PersonalNotes";
import { newLibrary } from "../../storybook-mocks/constants";

export default {
  title: "Elements/PersonalNotes",
};
export const Default = () => <PersonalNotes library={newLibrary} />;
