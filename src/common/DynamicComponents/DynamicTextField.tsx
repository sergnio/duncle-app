import { Field } from "react-final-form";
import React from "react";

interface DynamicTextFieldProps {
  name: string;
  placeholder: string;
}

export function DynamicTextField(props: DynamicTextFieldProps) {
  const { name, placeholder } = props;

  return (
    <>
      <Field
        name={name}
        component="input"
        type="text"
        placeholder={placeholder}
      />
    </>
  );
}
