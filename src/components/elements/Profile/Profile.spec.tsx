import React, { FC } from "react";
import { render } from "@testing-library/react";
import { SignedIn, SignedOut } from "./Profile.stories";
import { MemoryRouter } from "react-router-dom";

describe("Profile tests", function () {
  // eslint-disable-next-line react/prop-types
  const Wrapper: FC = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;
  it("should render in the signup form", function () {
    render(
      <Wrapper>
        <SignedIn />
      </Wrapper>
    );
  });
  it("should render in the signout form", function () {
    render(
      <Wrapper>
        <SignedOut />
      </Wrapper>
    );
  });
});
