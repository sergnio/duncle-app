import useStyles from "../../../global-styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import DefaultButton from "../../atoms/Button/DefaultButton";
import React from "react";

export default () => {
  const { paddingOneChildren } = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={paddingOneChildren}>
      <Typography variant="h4">You are not authorized</Typography>
      <Link to="/login">
        <DefaultButton>Sign in</DefaultButton>
      </Link>
    </Container>
  );
};
