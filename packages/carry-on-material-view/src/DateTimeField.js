import React from "react";
import { TextField } from "@mui/material";
import { withStyles } from "tss-react/mui";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { Field } from "carry-on-react-forms";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import getFieldStatus from "./getFieldStatus";

function DateTimeField({
  classes,
  name,
  label = name,
  disabled: disabledProp,
  value: valueProp,
  dateAdapter = AdapterDateFns,
  readOnly,
  ...props
}) {
  return (
    <Field path={name} type="date" readOnly={readOnly}>
      {(field, store) => {
        const { error, hasError, disabled, value } = getFieldStatus(
          field,
          store,
          valueProp,
          disabledProp
        );

        const handleDateTimeChange = dt => {
          field.setValue(dt);
          field.setTouched(true);
        };

        return (
          <LocalizationProvider dateAdapter={dateAdapter}>
            <DateTimePicker
              id={field.element.id}
              name={field.element.name}
              disabled={disabled}
              variant="inline"
              label={label}
              value={value}
              onChange={handleDateTimeChange}
              onBlur={field.element.onBlur}
              error={hasError}
              helperText={hasError && error}
              autoOk
              renderInput={params => <TextField {...params} />}
              {...props}
            />
          </LocalizationProvider>
        );
      }}
    </Field>
  );
}

const StyledDateTimeField = withStyles(
  DateTimeField,
  {},
  { name: "CoDateTimeField" }
);

export default StyledDateTimeField;
