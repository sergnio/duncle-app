import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { DateTimePicker } from "@material-ui/pickers";
import DatePickerWrapper from "./DatePickerWrapper";
import useGlobalDatePicker from "./useGlobalDatePicker";
import { useGlobalDatePickerState } from "../../../providers/GlobalDatePickerProvider";
import camelize from "../../../utils/camelize";
import { dateNowIso } from "../../../utils/dateUtil";
import useUpdateLibrary from "../../../hooks/useUpdateLibrary";
import { useNotification } from "../Snackbar/Snackbar";

export default () => {
  const label: string = camelize("Next appointment");
  const defaultDate = dateNowIso();
  const [datePickerValue, setDatePickerValue] = useState(defaultDate);
  const { setInfo } = useNotification();
  const { isOpen, noteMessage } = useGlobalDatePickerState();
  const { submitNewContactNote } = useUpdateLibrary();
  const { handleClose } = useGlobalDatePicker();

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          {/*
             NOTE: Borrowed from DatePicker.tsx
             We need to set the initial value of the Field so FF
             can pick it up if nothing has changed
         */}
          <DatePickerWrapper>
            <DateTimePicker
              variant="static"
              style={{ minWidth: "200px" }}
              onChange={(momentDate) => {
                if (momentDate) {
                  setDatePickerValue(momentDate.format());
                }
              }}
              defaultValue={defaultDate}
              name={label}
              value={datePickerValue}
              disablePast
              autoOk
            />
          </DatePickerWrapper>
        </Fade>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (noteMessage.current) {
                submitNewContactNote(noteMessage.current, datePickerValue);
              } else {
                setInfo("A message is required to save a note");
              }
              handleClose();
            }}
            color="secondary"
            type="submit"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
