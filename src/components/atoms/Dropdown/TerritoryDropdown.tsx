import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Territory from "../../../model/territory";

interface Props {
  options: Territory[];
  currentValue: Territory;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// feed data into here, display it, push it back onto the form
export default ({ options, currentValue, onChange }: Props) => {
  return (
    <TextField
      id="territory-dropdown"
      select
      label="Territory"
      fullWidth={true}
      margin="normal"
      value={currentValue}
      onChange={onChange}
      variant="outlined"
    >
      {options.map((option) => (
        // @ts-ignore - "value" should technically only be a string|number, but oh well..
        <MenuItem key={option.name} value={option}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};
