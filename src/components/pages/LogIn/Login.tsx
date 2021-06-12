import React, { useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Form } from "react-final-form";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { LogInForm } from "../../elements/LogIn/LogInForm";
import { Avatar } from "@material-ui/core";
import useStyles from "../../../global-styles";
import UserDAO from "../../../model/userDAO";
import User from "../../../model/user";
import { useHistory } from "react-router-dom";
import { useNotification } from "../../atoms/Snackbar/Snackbar";
import useAuth from "../../../common/hooks/Auth/useAuth";
import useLogin from "../../../services/useLogin";

export default function Login() {
  const { paper, avatar } = useStyles();
  const history = useHistory();
  const loginService = useLogin();
  const { authenticate } = useAuth();
  const { setError, setSuccess } = useNotification();

  async function submitForm(user: User) {
    try {
      const returnedUser: UserDAO = await loginService.logInUser(user);
      authenticate(returnedUser);
      history.push("/dashboard");
      setSuccess(`Login successful. Welcome ${returnedUser.firstName}`);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={paper}>
        <Avatar className={avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Form onSubmit={submitForm} component={LogInForm} />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright © Gumdrop CRM {new Date().getFullYear()}.
    </Typography>
  );
}
