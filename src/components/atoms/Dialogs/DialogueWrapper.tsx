import React, { ReactNode } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Form from "../../../common/Form";

export interface DialogProps {
  isOpen: boolean;
  handleSubmit(...args: any[]): any;
  handleCancel(...args: any[]): any;
}

interface WrapperProps extends DialogProps {
  children: ReactNode;
}

// make more dynamic - https://dev.to/dmtrkovalenko/the-neatest-way-to-handle-alert-dialogs-in-react-1aoe
export default ({
  isOpen,
  handleCancel,
  handleSubmit,
  children,
}: WrapperProps) => {
  return (
    <div>
      <Dialog
        style={{ height: "100%", width: "100%" }}
        open={isOpen}
        aria-labelledby="form-dialog-title"
      >
        <Form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Schedule New Event</DialogTitle>
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="secondary">
              <strong>Cancel</strong>
            </Button>
            <Button type="submit" color="primary">
              <strong>Save</strong>
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </div>
  );
};
