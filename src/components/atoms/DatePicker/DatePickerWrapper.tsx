import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import React, { PropsWithChildren } from "react";

export default ({ children }: PropsWithChildren<any>) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    {children}
  </MuiPickersUtilsProvider>
);
