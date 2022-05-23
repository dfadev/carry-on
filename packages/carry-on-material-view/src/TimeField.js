import React from "react";
import { TextField } from "@mui/material";
import { withStyles } from "tss-react/mui";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { Field } from "carry-on-react-forms";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import getFieldStatus from "./getFieldStatus";

function TimeField({
  classes,
  name,
  label = name,
  disabled: disabledProp,
  value: valueProp,
  dateAdapter = AdapterDateFns,
  ...props
}) {
  return (
    <Field path={name} type="date">
      {(field, store) => {
        const { error, hasError, disabled, value } = getFieldStatus(
          field,
          store,
          valueProp,
          disabledProp
        );

        const handleTimeChange = dt => {
          field.setValue(dt);
          field.setTouched(true);
        };

        return (
          <LocalizationProvider dateAdapter={dateAdapter}>
            <TimePicker
              id={field.element.id}
              name={field.element.name}
              disabled={disabled}
              variant="inline"
              label={label}
              value={value}
              onChange={handleTimeChange}
              onBlur={field.element.onBlur}
              format="MM/dd/yyyy"
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

const StyledTimeField = withStyles(TimeField, {}, { name: "CoTimeField" });

export default StyledTimeField;
