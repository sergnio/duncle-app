import React from "react";
import TextField from "@material-ui/core/TextField";
import { Field, FieldInputProps } from "react-final-form";
import camelize from "../../../utils/camelize";
import useStyles from "../../../global-styles";

interface TextFieldProps {
  name: string;
  isRequired?: boolean;
  defaultValue?: string | number;
  alsoInitialValue?: boolean;
  autoFocus?: boolean;
  fullWidth?: boolean;
}

export default function CustomTextField({
  name,
  isRequired = false,
  defaultValue = undefined,
  alsoInitialValue = false,
  autoFocus = false,
  fullWidth = false,
}: TextFieldProps) {
  const camelizedName: string = camelize(name);

  /**
   * InitialValue on our Final Form Field sets the Form value, such that when we don't change anything on the field,
   * we will submit whichever the value is on the form.
   * This is useful for setting default values on forms, without requiring user input.
   *
   * todo - check if we always want to be submitting both values anyway, or if there are cases where we don't
   */
  if (alsoInitialValue && defaultValue === undefined) {
    console.error(
      `If alsoInitialValue is specified, defaultValue must exist. field: ${name}, defaultValue: ${defaultValue}`
    );
  }
  const { menuButton } = useStyles();

  return (
    <Field
      name={camelizedName}
      initialValue={alsoInitialValue ? defaultValue : undefined}
    >
      {(props: FieldInputProps<any>) => (
        <TextField
          onChange={props.input.onChange}
          name={props.input.name}
          defaultValue={defaultValue}
          variant="outlined"
          margin="normal"
          required={isRequired}
          fullWidth={fullWidth}
          id={camelizedName}
          label={name}
          key={camelizedName}
          autoFocus={autoFocus}
        />
      )}
    </Field>
  );
}
