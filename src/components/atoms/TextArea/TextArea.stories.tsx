import React from "react";
import TextArea from "./TextArea";
import MockForm from "../../storybook-mocks/MockForm";

export default {
  title: "Atoms/TextArea",
  component: TextArea,
};
export const Default = () => (
  <MockForm>
    <TextArea name="example" placeholderText="Minimum of 4 rows" />
  </MockForm>
);
