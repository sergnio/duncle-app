import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import UserDAO from "../../../model/userDAO";

export type useAuthReturn = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  getAuthenticatedUser: string | Error;
  signOut: Function;
};

interface localStorageItem {
  value: UserDAO;
  expiry: number;
}
// todo - consider just moving this into a provider
// tutorial on setting local storage tokens with expiry dates
// https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
export default function useAuth() {
  const TOKEN_ID: string = "authCredentials";
  let history = useHistory();
  const [_, setIsLoggedIn] = useState<boolean>(false);

  function isValidToken(): boolean {
    return (
      typeof getWithExpiry(TOKEN_ID) !== "undefined" &&
      getWithExpiry(TOKEN_ID) !== null
    );
  }

  function setUserToken(user: UserDAO) {
    const now = new Date();
    const oneMinute = 60000;
    const oneHour = oneMinute * 60;
    const twoHours = oneHour * 2;

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item: localStorageItem = {
      // set user info, along with token
      value: user,
      expiry: now.getTime() + twoHours,
    };
    localStorage.setItem(TOKEN_ID, JSON.stringify(item));
  }

  function signOut(): void {
    localStorage.removeItem(TOKEN_ID);
    if (history) {
      history.push("/");
    }
    setIsLoggedIn(false);
  }

  return {
    // todo - return a state object containing this, rather than calling the isValidToken function
    //  everytime to get the state?
    //  downsides - it re-renders every single time rather than just calling the local storage.
    isAuthenticated: (): boolean => isValidToken(),
    getAuthenticatedUser: () => {
      const token: UserDAO | null = getWithExpiry(TOKEN_ID);
      if (token === null) {
        console.warn(`There is currently no user set. Token is ${token}`);
        history.push("/");
      } else {
        return token;
      }
    },
    authenticate: useCallback((user: UserDAO) => {
      setUserToken(user);
      setIsLoggedIn(true);
    }, []),
    signOut: useCallback(() => signOut(), []),
  };
}

// @ts-ignore
function getWithExpiry(key): UserDAO | null {
  const itemStr = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    // console.log("returning null")
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    // console.log("removing key")
    localStorage.removeItem(key);
    return null;
  }
  // console.log("returning key", item.value)
  return item.value;
}
