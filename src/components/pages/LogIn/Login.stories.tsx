import React from "react";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";

export default {
  title: `Pages/Login`,
  component: Login,
};

export const Default = () => (
  <BrowserRouter>
    <Login />
  </BrowserRouter>
);
