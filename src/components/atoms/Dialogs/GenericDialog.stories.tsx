import ListItem from "@material-ui/core/ListItem";
import React from "react";
import GenericDialog from "./GenericDialog";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

export default {
  title: "Atoms/Dialogs/GenericDialog",
};
export const FullScreenDialog = () => (
  <GenericDialog title="Full Screen Dialog!" fullScreen>
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
);

export const NormalDialog = () => (
  <GenericDialog title="Normal Dialog" fullScreen={false}>
    Great success!
  </GenericDialog>
);
