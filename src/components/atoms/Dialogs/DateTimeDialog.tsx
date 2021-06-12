import React from "react";
import DialogueWrapper, { DialogProps } from "./DialogueWrapper";
import CustomTextField from "../TextField/CustomTextField";

export interface DateDialogReturn {
  appointmentTitle: string;
}

export default (props: DialogProps) => (
  <DialogueWrapper {...props}>
    <CustomTextField name="Appointment Title" isRequired autoFocus />
  </DialogueWrapper>
);
