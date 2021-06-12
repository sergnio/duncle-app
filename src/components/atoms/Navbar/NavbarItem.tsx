import React from "react";
import { ListItemText } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import { useHistory } from "react-router-dom";

type NavbarItemProps = {
  url: string;
  displayText: string;
};

export default function NavbarItem({ url, displayText }: NavbarItemProps) {
  const history = useHistory();
  const navigate = () => history.push(url);

  return (
    <ListItem button onClick={() => navigate()}>
      <ListItemText>
        <Typography color="inherit" variant="h6">
          {displayText}
        </Typography>
      </ListItemText>
    </ListItem>
  );
}
