import React from "react";
import GlobalProvider from "../../../providers/GlobalProvider";
import PingAnything from "../Button/PingAnything";
import useAuth from "../../../hooks/Auth/useAuth";
import { dummyUserDAO } from "../../storybook-mocks/constants";

export default {
  title: "Atoms/Auth",
};

export const Default = () => {
  return (
    <GlobalProvider>
      <Auth />
    </GlobalProvider>
  );
};

const Auth = () => {
  const { isAuthenticated, authenticate } = useAuth();

  return (
    <PingAnything
      callback={() => {
        console.log("authenticating", authenticate(dummyUserDAO));
        const key = isAuthenticated();
        console.log("is authenticated!", key);
      }}
      name="Ping me"
    />
  );
};
