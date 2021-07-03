import React from "react";
import { Field, FieldInputProps } from "react-final-form";
import camelize from "../../../utils/camelize";
import { DateTimePicker } from "@material-ui/pickers";
import { dateNowIso, readableDate } from "../../../utils/dateUtil";
import DatePickerWrapper from "./DatePickerWrapper";
import { Moment } from "moment";

export default function () {
  const label = "Next appointment";
  const camelizedName: string = camelize(label);
  const defaultDate = dateNowIso();

  return (
    // We need to set the initial value of the Field so FF
    // can pick it up if nothing has changed
    <Field name={camelizedName} initialValue={defaultDate}>
      {(props: FieldInputProps<any>) => (
        <DatePickerWrapper>
          <DateTimePicker
            style={{ minWidth: "200px" }}
            onChange={(momentDate) => {
              if (momentDate !== null) {
                props.input.onChange(momentDate.format());
              }
            }}
            // todo - add this back in?
            // defaultValue={defaultDate}
            name={props.input.label}
            // @ts-ignore - this is literally just a moment date
            labelFunc={(momentDate: Moment) =>
              // if a date exists, show the readable date. Otherwise show an error message
              momentDate
                ? readableDate(momentDate.format())
                : "Date Format Error"
            }
            // thank you mui-rff
            // https://github.com/lookfirst/mui-rff/blob/master/src/DateTimePicker.tsx
            value={props.input.value}
            disablePast
            autoOk
          />
        </DatePickerWrapper>
      )}
    </Field>
  );
}
