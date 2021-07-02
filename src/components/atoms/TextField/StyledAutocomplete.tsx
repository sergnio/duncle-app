import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import camelize from "../../../utils/camelize";

interface Props<T> {
  label: string;
  value: T;
  onChange(_, newValue: T): void;
  options: T[];
  getOptionLabel: (option: T) => string;
}

export default function <Generic>({
  value,
  onChange,
  options,
  label,
  ...rest
}: Props<Generic>) {
  return (
    <Box padding={3}>
      <Autocomplete
        // @ts-ignore
        value={value}
        // @ts-ignore
        onChange={onChange}
        id={camelize(label)}
        options={options}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
        {...rest}
      />
    </Box>
  );
}
