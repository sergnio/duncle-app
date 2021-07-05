import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Territory from "../../../model/territory";
import { Field, FieldInputProps } from "react-final-form";
import TerritoryDropdown from "./TerritoryDropdown";

interface Props {
  options: Territory[];
  currentValue: Territory;
}

// feed data into here, display it, push it back onto the form
export default ({ currentValue, options }: Props) => (
  <Field name="territoryId" initialValue={currentValue}>
    {(props: FieldInputProps<any>) => (
      <TerritoryDropdown
        onChange={props.input.onChange}
        currentValue={currentValue}
        options={options}
      />
    )}
  </Field>
);
