import React from "react";
import Profile from "./Profile";
import { LocalStorageMockProvider } from "../../storybook-mocks/MockProviders";

export default {
  title: "Elements/Profile",
};

export const SignedOut = () => <Profile />;

export const SignedIn = () => (
  <LocalStorageMockProvider>
    <Profile />
  </LocalStorageMockProvider>
);
