import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import { Field } from "carry-on-react-forms";
import DateFnsUtils from '@date-io/date-fns';
import getFieldStatus from "./getFieldStatus";

const DateTimeField = withStyles(
  {},
  { name: "CoDateTimeField" }
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

        function handleDateTimeChange(dt) {
          field.setValue(dt);
          field.setTouched(true);
        }

        const Picker = keyboard ? KeyboardDateTimePicker : DateTimePicker;

        return (
          <MuiPickersUtilsProvider utils={DateUtils}>
            <Picker
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
              {...props}
            />
          </MuiPickersUtilsProvider>
        );
      }}
    </Field>
  )
);

export default DateTimeField;
