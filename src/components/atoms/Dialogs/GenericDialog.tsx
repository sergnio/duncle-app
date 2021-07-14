import React, { PropsWithChildren } from "react";
import {
  AppBar,
  Dialog,
  DialogActions,
  ListItem,
  ListItemText,
  Slide,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { TransitionProps } from "@material-ui/core/transitions";
import Toolbar from "@material-ui/core/Toolbar";
import styled from "styled-components";

const StyledAppBar = styled(AppBar)`
  position: relative;
`;

const StyledTypography = styled(Typography)`
  margin-left: 1em;
  flex: 1;
`;

interface Props {
  fullScreen?: boolean;
  title: string;
}

export default ({
  fullScreen = false,
  children,
  title,
}: PropsWithChildren<Props>) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <StyledAppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <StyledTypography variant="h6">{title}</StyledTypography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </StyledAppBar>
        {fullScreen ? (
          <>{children}</>
        ) : (
          <DialogActions>{children}</DialogActions>
        )}
      </Dialog>
    </div>
  );
};
