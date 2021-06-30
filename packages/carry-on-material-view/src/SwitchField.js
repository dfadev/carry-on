import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";

export default withStyles(
  {
    formControlRoot: {
      verticalAlign: "middle"
    }
  },
  { name: "CoSwitchField" }
)(
  ({
    classes,
    name,
    readOnly,
    label = name,
    disabled: disabledProp,
    value: valueProp,
    labelPlacement,
    required,
    ...rest
  }) => (
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
  )
);
