import React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import { withStyles } from "tss-react/mui";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";

function SwitchField({
  classes,
  name,
  readOnly,
  label = name,
  disabled: disabledProp,
  value: valueProp,
  labelPlacement,
  required,
  ...rest
}) {
  return (
    <Field path={name} type="checkbox" readOnly={readOnly}>
      {(field, store) => {
        const { error, hasError, disabled, value } = getFieldStatus(
          field,
          store,
          valueProp,
          disabledProp
        );

        return (
          <FormControl
            error={hasError}
            required={required}
            classes={{ root: classes.formControlRoot }}
          >
            <FormControlLabel
              control={
                <Switch
                  inputProps={{ ...field.element, checked: value }}
                  checked={value}
                  {...rest}
                />
              }
              label={label}
              labelPlacement={labelPlacement}
              disabled={disabled}
            />
            {hasError && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );
      }}
    </Field>
  );
}

const StyledSwitchField = withStyles(
  SwitchField,
  {
    formControlRoot: {
      verticalAlign: "middle"
    }
  },
  { name: "CoSwitchField" }
);

export default StyledSwitchField;
