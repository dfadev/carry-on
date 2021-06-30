import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Inspector from "react-inspector";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";

const InspectorField = withStyles(
  {
    labelRoot: {
      alignItems: "start"
    }
  },
  { name: "CoInspectorField" }
)(
  ({
    classes,
    name,
    label,
    value: valueProp,
    disabled: disabledProp,
    labelPlacement = "top",
    ...props
  }) => (
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
  )
);

export default InspectorField;
