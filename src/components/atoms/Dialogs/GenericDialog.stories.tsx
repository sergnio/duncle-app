import ListItem from "@material-ui/core/ListItem";
import React from "react";
import GenericDialog from "./GenericDialog";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import useConfirmDialog from "./useConfirmDialog";

export default {
  title: "Atoms/Dialogs/GenericDialog",
};
export const FullScreenDialog = () => {
  const { open, handleOpen, handleClose } = useConfirmDialog();

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Open full-screen dialog
      </Button>
      <GenericDialog
        title="Full Screen Dialog!"
        fullScreen
        open={open}
        handleClose={handleClose}
      >
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </GenericDialog>
    </>
  );
};

export const NormalDialog = () => {
  const { open, handleOpen, handleClose } = useConfirmDialog();

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Open full-screen dialog
      </Button>
      <GenericDialog
        title="Normal Dialog"
        open={open}
        handleClose={handleClose}
      >
        Great success!
      </GenericDialog>
    </>
  );
};
