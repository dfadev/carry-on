import React from "react";
import { TextField } from "@mui/material";
import { withStyles } from "tss-react/mui";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Field } from "carry-on-react-forms";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import getFieldStatus from "./getFieldStatus";

const defaultInitialDate = new Date();
defaultInitialDate.setFullYear(defaultInitialDate.getFullYear() - 18);

function DobField({
  classes,
  name,
  label = name,
  disabled: disabledProp,
  value: valueProp,
  initialDate = defaultInitialDate,
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
              disableFuture
              initialFocusedDate={initialDate}
              openTo="year"
              views={["year", "month", "day"]}
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

const StyledDobField = withStyles(DobField, {}, { name: "CoDobField" });

export default StyledDobField;
