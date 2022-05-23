import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { withStyles } from "tss-react/mui";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";

function CheckboxField({
  name,
  label = name,
  readOnly,
  required,
  disabled: disabledProp,
  value: valueProp,
  labelPlacement,
  ...props
}) {
  return (
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
  );
}

const StyledCheckboxField = withStyles(
  CheckboxField,
  {},
  { name: "CoCheckboxField" }
);

export default StyledCheckboxField;
