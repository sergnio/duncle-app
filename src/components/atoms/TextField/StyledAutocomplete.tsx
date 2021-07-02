import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import camelize from "../../../utils/camelize";
import UserDAO from "../../../model/userDAO";

interface Props {
  label: string;
  value: UserDAO;
  onChange(_, newValue: UserDAO): void;
  options: UserDAO[];
  getOptionLabel: (option: UserDAO) => string;
}

export default ({ value, onChange, options, label, ...rest }: Props) => (
  <Box padding={3}>
    <Autocomplete
      value={value}
      onChange={onChange}
      id={camelize(label)}
      options={options}
      style={{ width: 200 }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
      {...rest}
    />
  </Box>
);
