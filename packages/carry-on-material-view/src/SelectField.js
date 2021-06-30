import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";

const SelectField = withStyles(
  {},
  { name: "CoSelectField" }
)(
  ({
    name,
    options,
    label = name,
    disabled: disabledProp,
    value: valueProp,
    readOnly = false,
    ...props
  }) => (
    <Field path={name} readOnly={readOnly}>
      {(field, store) => {
        const { element } = field;
        const { error, hasError, disabled, value } = getFieldStatus(
          field,
          store,
          valueProp,
          disabledProp
        );

        const isNative = props.SelectProps && props.SelectProps.native;

        const realOptions =
          typeof options === "function" ? options(field) : options;

        return (
          <TextField
            select
            label={label}
            inputProps={{ ...element, value }}
            onBlur={element.onBlur || undefined}
            onChange={element.onChange || undefined}
            value={value}
            error={hasError}
            helperText={hasError && error}
            disabled={disabled}
            {...props}
          >
            {realOptions &&
              realOptions.map(o =>
                isNative ? (
                  <option key={o.value} value={o.value}>
                    {o.label || o.value}
                  </option>
                ) : (
                  <MenuItem key={o.value} value={o.value}>
                    {o.label || o.value}
                  </MenuItem>
                )
              )}
          </TextField>
        );
      }}
    </Field>
  )
);

export default SelectField;
