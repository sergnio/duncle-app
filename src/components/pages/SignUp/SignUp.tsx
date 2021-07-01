import React from "react";
import useStyles from "../../../global-styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Form } from "react-final-form";
import { SignUpForm } from "../../elements/SignUp/SignUpForm";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NewUser from "../../../model/newUser";
import UserDAO from "../../../model/userDAO";
import { useHistory } from "react-router-dom";
import { useNotification } from "../../atoms/Snackbar/Snackbar";
import { isEqual } from "lodash";
import useAuth from "../../../hooks/Auth/useAuth";
import useLogin from "../../../services/useLogin";
import { getUsernameFromEmail } from "../../../utils/textFormatUtils";

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const loginService = useLogin();
  const { authenticate } = useAuth();
  const { setError, setSuccess } = useNotification();

  async function submitForm(newUser: NewUser) {
    if (!isEqual(newUser.confirmPassword, newUser.password)) {
      // todo - replace with form validation
      setError("Passwords are not equal");
      return;
    }
    // @ts-ignore - for now ignore bc new TS doesn't allow modifying an object
    delete newUser.confirmPassword;
    try {
      newUser.username = getUsernameFromEmail(newUser.email);

      const response = await loginService.signUpUser(newUser);
      console.log("Response in sign up tsx - should be error", response);

      if (response instanceof Error) {
        setError(`Error: ${response.message}`);
      } else {
        const newlyCreatedUser: UserDAO = {
          _id: response.id,
          _rev: response.rev,
          ...newUser,
        };

        await authenticate(newlyCreatedUser);
        history.push("/dashboard");
        setSuccess(`Sign up successful. Welcome ${newUser.firstName}!`);
      }
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create your new account
        </Typography>
        <Form onSubmit={submitForm} component={SignUpForm} />
      </div>
    </Container>
  );
}
