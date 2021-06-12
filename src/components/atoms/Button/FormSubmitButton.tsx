import React from "react";
import Button from "@material-ui/core/Button";
import useStyles from "../../../global-styles";

type ButtonProps = {
  DisplayText: string;
  fullWidth?: boolean;
};

export default function ({ DisplayText, fullWidth = false }: ButtonProps) {
  const { submit } = useStyles();

  return (
    <Button
      type="submit"
      fullWidth={fullWidth}
      variant="contained"
      color="primary"
      className={submit}
    >
      {DisplayText}
    </Button>
  );
}
