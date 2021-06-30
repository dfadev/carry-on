import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { Field } from "carry-on-react-forms";
import DateFnsUtils from "@date-io/date-fns";
import getFieldStatus from "./getFieldStatus";

const defaultInitialDate = new Date();
defaultInitialDate.setFullYear(defaultInitialDate.getFullYear() - 18);

const DobField = withStyles(
  {},
  { name: "CoDobField" }
)(
  ({
    classes,
    name,
    label = name,
    disabled: disabledProp,
    value: valueProp,
    initialDate = defaultInitialDate,
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
              disableFuture
              initialFocusedDate={initialDate}
              openTo="year"
              views={["year", "month", "date"]}
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

export default DobField;
