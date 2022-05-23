import React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Inspector from "react-inspector";
import { withStyles } from "tss-react/mui";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";

function InspectorField({
  classes,
  name,
  label,
  value: valueProp,
  disabled: disabledProp,
  labelPlacement = "top",
  ...props
}) {
  return (
    <Field path={name} type="button">
      {(field, store) => {
        const { hasError, error, disabled } = getFieldStatus(
          field,
          store,
          valueProp,
          disabledProp
        );

        return (
          <FormControl error={hasError}>
            <FormControlLabel
              classes={{ root: classes.labelRoot }}
              control={<Inspector data={field.form} {...props} />}
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

const StyledInspectorField = withStyles(
  InspectorField,
  {
    labelRoot: {
      alignItems: "start"
    }
  },
  { name: "CoInspectorField" }
);

export default StyledInspectorField;
