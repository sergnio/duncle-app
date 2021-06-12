import React from "react";
import NewNote from "./NewNote";
import { GlobalDatePickerProvider } from "../../../common/providers/GlobalDatePickerProvider";

export default {
  title: "Elements/NewNote",
  component: NewNote,
};

export const Default = () => <NewNote />;
