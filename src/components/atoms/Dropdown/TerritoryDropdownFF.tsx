import React from "react";
import Territory from "../../../model/territory";
import { Field, FieldInputProps } from "react-final-form";
import TerritoryDropdown from "./TerritoryDropdown";

interface Props {
  options: Territory[];
  currentValue?: string;
}

export default ({ currentValue, options }: Props) => (
  <Field name="territoryId" initialValue={currentValue}>
    {({ input: { onChange, value } }: FieldInputProps<Territory>) => (
      <TerritoryDropdown
        onChange={onChange}
        currentValue={value}
        options={options}
      />
    )}
  </Field>
);
