import Grid from "@material-ui/core/Grid";
import React from "react";
import EmailTextField from "../../atoms/TextField/EmailTextField";
import PasswordTextField from "../../atoms/TextField/PasswordTextField";
import useStyles from "../../../global-styles";
import FormSubmitButton from "../../atoms/Button/FormSubmitButton";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CustomTextField from "../../atoms/TextField/CustomTextField";

export const LogInForm = (props: any) => {
  const classes = useStyles();
  const { handleSubmit } = props;

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <EmailTextField fullWidth />
      <PasswordTextField fullWidth />
      <FormSubmitButton DisplayText="Sign in" />
      <Grid container>
        <Grid item xs>
          <Link to="/password/reset">
            <Typography variant="body2">Forgot password?</Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/signup">
            <Typography variant="body2">
              Don't have an account? Sign Up
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};
