import React from "react";
import TextField from "@material-ui/core/TextField";
import { Field, FieldInputProps } from "react-final-form";

interface Props {
  fullWidth?: boolean;
}

export default function EmailTextField({ fullWidth = false }: Props) {
  return (
    <Field name="email">
      {({ input }: FieldInputProps<any>) => (
        <>
          <TextField
            onChange={input.onChange}
            value={input.value}
            name={input.name}
            variant="outlined"
            margin="normal"
            required
            fullWidth={fullWidth}
            label="Email Address"
            id="email"
            autoComplete="email"
            autoFocus
          />
        </>
      )}
    </Field>
  );
}
