import React from "react";
import Table from "./Table";
import { newLibrary, newLibrary2 } from "../../storybook-mocks/constants";

export default {
  title: "Elements/Table",
};

export const Default = () => <Table libraries={[newLibrary, newLibrary2]} />;
