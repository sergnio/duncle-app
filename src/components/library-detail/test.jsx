import React from "react";
import LibraryEdit from "../library-edit/components/LibraryEdit";
import { NoLibrary } from "../storybook-mocks/constants";

export default function test() {
  return <LibraryEdit library={NoLibrary} />;
}
