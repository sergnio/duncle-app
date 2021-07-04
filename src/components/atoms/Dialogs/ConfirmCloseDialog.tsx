import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  open: boolean;
  message: string;
}

export default ({ onConfirm, onCancel, message, ...other }: Props) => (
  <Dialog
    disableBackdropClick
    disableEscapeKeyDown
    maxWidth="xs"
    aria-labelledby="confirm-delete"
    open={open}
    {...other}
  >
    <DialogTitle id="confirm-delete">Confirm deletion</DialogTitle>
    <DialogContent dividers>
      <h1>{message}</h1>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={onCancel} color="primary" variant="contained">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="primary" variant="outlined">
        Ok
      </Button>
    </DialogActions>
  </Dialog>
);
