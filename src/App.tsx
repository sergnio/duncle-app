import React from "react";
import "./App.css";
import GlobalProvider from "./common/providers/GlobalProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ReactQueryDevtools } from "react-query/devtools";
import Routes from "./components/elements/Routes";
import Navbar from "./components/elements/Navbar/Navbar";
import Snackbar from "./components/atoms/Snackbar/Snackbar";

export default () => (
  <div className="App">
    <CssBaseline />
    <GlobalProvider>
      <ReactQueryDevtools />
      <Routes>
        <Navbar />
        <Snackbar />
      </Routes>
    </GlobalProvider>
  </div>
);
