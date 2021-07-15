import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Territory from "../../../model/territory";

interface Props {
  options: Territory[];
  currentValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default ({ options, currentValue, onChange, ...rest }: Props) => (
  <TextField
    id="territory-dropdown"
    select
    label="Territory"
    fullWidth={true}
    margin="normal"
    value={currentValue}
    onChange={onChange}
    variant="outlined"
    {...rest}
  >
    {options.map((option) => (
      <MenuItem key={option.name} value={option._id}>
        {option.name}
      </MenuItem>
    ))}
  </TextField>
);
