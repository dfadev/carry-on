import React from "react";
import { TextField } from "@mui/material";
import { withStyles } from "tss-react/mui";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Field } from "carry-on-react-forms";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import getFieldStatus from "./getFieldStatus";

function DateField({
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

        const handleDateChange = dt => {
          field.setValue(dt);
          field.setTouched(true);
        };

        return (
          <LocalizationProvider dateAdapter={dateAdapter}>
            <DatePicker
              id={field.element.id}
              name={field.element.name}
              disabled={disabled}
              variant="inline"
              label={label}
              value={value}
              onChange={handleDateChange}
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

const StyledDateField = withStyles(DateField, {}, { name: "CoDateField" });

export default StyledDateField;
