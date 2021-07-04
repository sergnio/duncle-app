import useAuth from "./useAuth";
import { renderHook, act } from "@testing-library/react-hooks";
import { dummyUserDAO } from "../../components/storybook-mocks/constants";
import noop from "../../utils/noop";
import { useLocation, MemoryRouter } from "react-router-dom";
import { FC } from "react";

describe("Auth hooks - authentication flow tests", () => {
  const wrapper: FC = ({ children }) => (
    // eslint-disable-next-line react/react-in-jsx-scope
    <MemoryRouter initialEntries={["home"]}>{children}</MemoryRouter>
  );

  const {
    result: { current },
  } = renderHook(() => useAuth(), { wrapper });
  const { isAuthenticated, signOut, getAuthenticatedUser, authenticate } =
    current;

  function testAuthentication(
    title: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    callbackFunction: Function,
    expectedResult: any
  ) {
    test(title, () => {
      act(() => {
        callbackFunction();
      });
      const authResult = isAuthenticated();
      expect(authResult).toBe(expectedResult);
    });
  }

  testAuthentication(
    "On page load, isAuthenticated should return false since we haven't authenticated",
    noop,
    false
  );

  const authCallback = () => authenticate(dummyUserDAO);

  testAuthentication(
    "If we call authentication, isAuthenticated should return true",
    authCallback,
    true
  );

  test("Test if getAuthenticatedUser returns the correct user", () => {
    const getUserResult = getAuthenticatedUser();
    console.log({ getUserResult });
    expect(getUserResult).toEqual(dummyUserDAO);
  });

  testAuthentication(
    "If we call signout, isAuthenticated should return false",
    signOut,
    false
  );

  // todo - future: fast forward time past 1 hour and test if still authenticated
});
