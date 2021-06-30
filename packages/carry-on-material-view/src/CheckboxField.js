import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";

const CheckboxField = withStyles(
  {},
  { name: "CoCheckboxField" }
)(
  ({
    name,
    label = name,
    readOnly,
    required,
    disabled: disabledProp,
    value: valueProp,
    labelPlacement,
    ...props
  }) => (
    <Field path={name} type="checkbox" readOnly={readOnly}>
      {(field, store) => {
        const { element } = field;
        const { error, hasError, disabled, value } = getFieldStatus(
          field,
          store,
          valueProp,
          disabledProp
        );

        return (
          <FormControl error={hasError} required={required}>
            <FormControlLabel
              control={
                <Checkbox
                  {...props}
                  inputProps={{ ...element, checked: value }}
                  checked={value}
                />
              }
              label={label}
              disabled={disabled}
              labelPlacement={labelPlacement}
            />
            {hasError && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );
      }}
    </Field>
  )
);

export default CheckboxField;
