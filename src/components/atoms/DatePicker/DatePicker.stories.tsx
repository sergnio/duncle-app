import React, { PropsWithChildren } from "react";
import DatePicker from "./DatePicker";
import MockForm from "../../storybook-mocks/MockForm";
import DefaultButton from "../Button/DefaultButton";

export default {
  title: "Atoms/DatePicker",
};

const MockWrapper = ({ children }: PropsWithChildren<any>) => (
  <MockForm>
    <div>{children}</div>
    <div>
      <DefaultButton type="submit">Submit</DefaultButton>
    </div>
  </MockForm>
);

export const Default = () => (
  <MockWrapper>
    <DatePicker />
  </MockWrapper>
);
