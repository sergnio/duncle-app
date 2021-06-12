import React from "react";
import MockForm from "../../storybook-mocks/MockForm";
import AddLibraryForm from "./AddLibraryForm";

export default {
  title: "Elements/AddLibraryForm",
  component: AddLibraryForm,
};

export const Default = () => (
  <MockForm>
    <AddLibraryForm />
  </MockForm>
);
