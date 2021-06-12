import React from "react";
import CustomTextField from "./CustomTextField";
import EmailTextField from "./EmailTextField";
import PasswordTextFieldProps from "./PasswordTextField";
import MockForm from "../../storybook-mocks/MockForm";
import NumberTextField from "./NumberTextField";

export default {
  title: "Atoms/TextField",
};

export const emailField = () => (
  <MockForm>
    <EmailTextField />
  </MockForm>
);

export const numberField = () => (
  <MockForm>
    <NumberTextField name="Numbers Only" />
  </MockForm>
);

export const passwordField = () => (
  <MockForm>
    <PasswordTextFieldProps />
  </MockForm>
);

export const customTextField = () => (
  <MockForm>
    <CustomTextField name={"Custom Text"} />
  </MockForm>
);

export const customTextFieldError = () => (
  <MockForm>
    <CustomTextField name={"Custom Text"} alsoInitialValue={true} />
  </MockForm>
);

export const requiredField = () => (
  <MockForm>
    <CustomTextField
      name={"This should have an asterisk next to it"}
      isRequired
    />
  </MockForm>
);
