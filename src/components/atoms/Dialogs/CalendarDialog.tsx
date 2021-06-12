import React from "react";
import Calendar from "../Calendar/Calendar";
import DialogueWrapper, { DialogProps } from "./DialogueWrapper";
import CalendarController from "../Calendar/CalendarController";

export default (props: DialogProps) => (
  <DialogueWrapper {...props}>
    <CalendarController />
  </DialogueWrapper>
);
