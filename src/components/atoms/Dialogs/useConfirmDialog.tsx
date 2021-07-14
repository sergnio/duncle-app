import React, { useState } from "react";

interface Props {
  open: boolean;
  handleOpen(): void;
  handleClose(): void;
}

export default (): Props => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return { open, handleOpen, handleClose };
};
