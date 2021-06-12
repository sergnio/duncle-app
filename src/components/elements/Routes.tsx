import React, { PropsWithChildren } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/LogIn/Login";
import PrivateRoute from "../atoms/Route/PrivateRoute";
import AllLibraries from "../pages/Dashboard/Dashboard";
import CalendarController from "../atoms/Calendar/CalendarController";
import AddLibrary from "../pages/AddLibrary/AddLibrary";
import ViewLibrary from "../pages/ViewLibrary/ViewLibrary";
import EditLibraryController from "../pages/EditLibrary/EditLibraryController";
import Unauthorized from "./Unauthorized/Unauthorized";
import SeeOthersProvider from "../../common/providers/SeeOthersProvider";

export default ({ children }: PropsWithChildren<any>) => (
  <Router>
    {children}
    <Switch>
      {/* todo - auto route to login page if we're not logged in */}
      <Redirect exact from="/" to="login" />
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/login">
        {/* TODO - REDIRECT */}
        <Login />
      </Route>
      <PrivateRoute
        exact
        path="/dashboard"
        component={() => (
          <SeeOthersProvider>
            <AllLibraries />
          </SeeOthersProvider>
        )}
      />
      <PrivateRoute
        exact
        path="/calendar"
        component={() => (
          <SeeOthersProvider>
            <CalendarController />
          </SeeOthersProvider>
        )}
      />
      <PrivateRoute exact path="/library/new" component={AddLibrary} />
      <PrivateRoute exact path="/library/:libraryId" component={ViewLibrary} />
      <PrivateRoute
        exact
        path="/library/:libraryId/edit"
        component={EditLibraryController}
      />

      <Route path="/unauthorized" component={Unauthorized} />
    </Switch>
  </Router>
);
