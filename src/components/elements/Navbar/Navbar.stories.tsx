import React from "react";
import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Elements/Navbar",
  component: Navbar,
};

export const Default = () => (
  <BrowserRouter>
    <Navbar />
  </BrowserRouter>
);
