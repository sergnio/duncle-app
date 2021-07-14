import React, { PropsWithChildren } from "react";
import { AppBar, Dialog, DialogActions, Slide } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { TransitionProps } from "@material-ui/core/transitions";
import Toolbar from "@material-ui/core/Toolbar";
import styled from "styled-components";

const StyledTypography = styled(Typography)`
  margin-left: 1em;
  flex: 1;
`;

interface Props {
  fullScreen?: boolean;
  title: string;
  open: boolean;
  handleClose(): void;
}

export default ({
  fullScreen = false,
  children,
  title,
  open,
  handleClose,
}: PropsWithChildren<Props>) => {
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar style={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <StyledTypography>{title}</StyledTypography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        {fullScreen ? (
          <>{children}</>
        ) : (
          <DialogActions>{children}</DialogActions>
        )}
      </Dialog>
    </div>
  );
};
