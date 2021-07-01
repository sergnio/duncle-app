import React, { ReactElement } from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../../../hooks/Auth/useAuth";

const DEFAULT_INPUT = "";

interface Props {
  component: any;
  requiredRole?: string;
  [rest: string]: any;
}

export default ({
  component: Component,
  requiredRole = DEFAULT_INPUT,
  ...rest
}: Props) => {
  const { isAuthenticated, getAuthenticatedUser } = useAuth();

  let canAccess: boolean;
  if (requiredRole !== DEFAULT_INPUT) {
    canAccess =
      isAuthenticated() && getAuthenticatedUser()?.role === requiredRole;
  } else {
    canAccess = isAuthenticated();
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        canAccess ? <Component {...props} /> : <Redirect to="/unauthorized" />
      }
    />
  );
};
