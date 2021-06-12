import React from "react";
import { render } from "@testing-library/react";
import { SignedIn, SignedOut } from "./Profile.stories";

describe("Profile tests", function () {
  it("should render in both forms", function () {
    render(<SignedIn />);
    render(<SignedOut />);
  });
});
