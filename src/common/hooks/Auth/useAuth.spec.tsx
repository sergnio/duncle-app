import useAuth from "./useAuth";
import { renderHook, act } from "@testing-library/react-hooks";
import { dummyUserDAO } from "../../../components/storybook-mocks/constants";
import noop from "../../../utils/noop";

describe("Auth hooks - authentication flow tests", () => {
  const {
    result: { current },
  } = renderHook(() => useAuth());
  const {
    isAuthenticated,
    signOut,
    getAuthenticatedUser,
    authenticate,
  } = current;

  function testAuthentication(
    title: string,
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
