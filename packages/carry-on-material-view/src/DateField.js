import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { Field } from "carry-on-react-forms";
import DateFnsUtils from '@date-io/date-fns';
import getFieldStatus from "./getFieldStatus";

const DateField = withStyles(
  {},
  { name: "CoDateField" }
)(
  ({
    classes,
    name,
    label = name,
    disabled: disabledProp,
    value: valueProp,
    DateUtils = DateFnsUtils,
    keyboard = true,
    readOnly,
    ...props
  }) => (
    <Field path={name} type="date" readOnly={readOnly}>
      {(field, store) => {
        const { error, hasError, disabled, value } = getFieldStatus(
          field,
          store,
          valueProp,
          disabledProp
        );

        function handleDateChange(dt) {
          field.setValue(dt);
          field.setTouched(true);
        }

        const Picker = keyboard ? KeyboardDatePicker : DatePicker;

        return (
          <MuiPickersUtilsProvider utils={DateUtils}>
            <Picker
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
              {...props}
            />
          </MuiPickersUtilsProvider>
        );
      }}
    </Field>
  )
);

export default DateField;
