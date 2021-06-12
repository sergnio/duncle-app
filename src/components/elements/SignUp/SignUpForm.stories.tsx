import React from "react";
import MockForm from "../../storybook-mocks/MockForm";
import { SignUpForm } from "./SignUpForm";

export default {
  title: "Elements/SignUpForm",
  component: SignUpForm,
};

export const Default = () => (
  <MockForm>
    <SignUpForm />
  </MockForm>
);
