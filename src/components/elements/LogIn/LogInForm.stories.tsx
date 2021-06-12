import React from "react";
import { LogInForm } from "./LogInForm";
import MockForm from "../../storybook-mocks/MockForm";
import { BrowserRouter } from "react-router-dom";

export default {
  title: `Elements/LogInForm`,
  component: LogInForm,
};

export const Default = () => (
  <MockForm>
    <BrowserRouter>
      <LogInForm />
    </BrowserRouter>
  </MockForm>
);
