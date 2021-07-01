import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import camelize from "../../../utils/camelize";

interface Props {
  label: string;
  value: string;
  onChange(_, newValue: string | null): void;
  options: string[];
}

export default ({ value, onChange, options, label }: Props) => (
  <Box padding={3}>
    <Autocomplete
      value={value}
      onChange={onChange}
      inputValue={value}
      onInputChange={onChange}
      id={camelize(label)}
      options={options}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  </Box>
);
