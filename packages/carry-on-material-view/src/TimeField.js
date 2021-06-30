import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  KeyboardTimePicker
} from "@material-ui/pickers";
import { Field } from "carry-on-react-forms";
import DateFnsUtils from "@date-io/date-fns";
import getFieldStatus from "./getFieldStatus";

const TimeField = withStyles(
  {},
  { name: "CoTimeField" }
)(
  ({
    classes,
    name,
    label = name,
    disabled: disabledProp,
    value: valueProp,
    TimeUtils = DateFnsUtils,
    keyboard = false,
    ...props
  }) => (
    <Field path={name} type="date">
      {(field, store) => {
        const { error, hasError, disabled, value } = getFieldStatus(
          field,
          store,
          valueProp,
          disabledProp
        );

        function handleTimeChange(dt) {
          field.setValue(dt);
          field.setTouched(true);
        }

        const Picker = keyboard ? KeyboardTimePicker : TimePicker;

        return (
          <MuiPickersUtilsProvider utils={TimeUtils}>
            <Picker
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
              {...props}
            />
          </MuiPickersUtilsProvider>
        );
      }}
    </Field>
  )
);

export default TimeField;
