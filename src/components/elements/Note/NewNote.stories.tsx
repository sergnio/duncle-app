import React from "react";
import NewNote from "./NewNote";
import { GlobalDatePickerProvider } from "../../../providers/GlobalDatePickerProvider";

export default {
  title: "Elements/NewNote",
  component: NewNote,
};

export const Default = () => <NewNote />;
