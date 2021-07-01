import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import camelize from "../../../utils/camelize";

interface Props {
  label: string;
  autocompleteValue: string;
  onValueChange(_, newValue: string | null): void;
  displayValue: string;
  onDisplayChange(_, newValue: string | null): void;
  options: string[];
}

export default ({
  autocompleteValue,
  onValueChange,
  displayValue,
  onDisplayChange,
  options,
  label,
}: Props) => {
  const camelized = camelize(label);
  return (
    <Box padding={3}>
      <Autocomplete
        value={autocompleteValue}
        onChange={onValueChange}
        inputValue={displayValue}
        onInputChange={onDisplayChange}
        id={camelized}
        options={options}
        // getOptionLabel={(option) => option.toString()}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
      />
    </Box>
  );
};
