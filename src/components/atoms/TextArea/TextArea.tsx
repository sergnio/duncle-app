import React, { ChangeEvent } from "react";
import { TextareaAutosize } from "@material-ui/core";
import { Field, FieldInputProps } from "react-final-form";
import camelize from "../../../utils/camelize";
import TextField from "@material-ui/core/TextField";

type TextAreaType = {
  name: string;
  placeholderText: string;
  onChangeFunction?(event: ChangeEvent<HTMLTextAreaElement>): void;
  message?: string;
  className?: string;
};

export default function ({
  name,
  placeholderText,
  className = "",
  message = "",
  onChangeFunction,
}: TextAreaType) {
  const camelizedName: string = camelize(name);

  return (
    <Field name={camelizedName} initialValue={message}>
      {(props: FieldInputProps<any>) => (
        <TextareaAutosize
          onChange={onChangeFunction ? onChangeFunction : props.input.onChange}
          className={className}
          defaultValue={message}
          name={props.input.name}
          id={camelizedName}
          key={camelizedName}
          aria-label="minimum height"
          rowsMin={4}
          placeholder={placeholderText}
          required
        />
      )}
    </Field>
  );
}
