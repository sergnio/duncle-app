import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Territory from "../../../model/territory";
import { Field, FieldInputProps } from "react-final-form";
import TerritoryDropdown from "./TerritoryDropdown";

interface Props {
  options: Territory[];
  currentValue: string;
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
