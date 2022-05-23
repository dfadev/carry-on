import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { withStyles } from "tss-react/mui";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";

function RadioField({
  classes = {},
  name,
  readOnly,
  label = name,
  options,
  row,
  disabled: disabledProp,
  value: valueProp,
  j = 0
}) {
  return (
    <Field path={name} readOnly={readOnly}>
      {(field, store) => {
        const { error, hasError, disabled, value } = getFieldStatus(
          field,
          store,
          valueProp,
          disabledProp
        );

        const opts = typeof options === "function" ? options(field) : options;

        return (
          <FormControl>
            <Box width="100%">
              <InputLabel
                shrink
                error={hasError}
                disabled={disabled}
                classes={{
                  shrink: classes.shrink,
                  formControl: classes.formControl
                }}
              >
                {label}
              </InputLabel>
              <RadioGroup
                row={row}
                name={name}
                className={classes.group}
                value={value}
                onChange={field.element.onChange}
                onBlur={field.element.onBlur}
                disabled={disabled}
              >
                {opts &&
                  opts.map(
                    ({
                      label: lbl,
                      value: val = lbl,
                      control,
                      extra = null
                    }) => {
                      j += 1;

                      if (typeof lbl !== "string")
                        lbl = React.cloneElement(lbl);

                      return (
                        <React.Fragment key={`radio-${name}-${j}`}>
                          <FormControlLabel
                            classes={{
                              label: classes.label
                            }}
                            value={val}
                            control={control || <Radio />}
                            label={lbl}
                            disabled={disabled}
                          />
                          {extra}
                        </React.Fragment>
                      );
                    }
                  )}
              </RadioGroup>
              {hasError && (
                <FormHelperText error={hasError}>{error}</FormHelperText>
              )}
            </Box>
          </FormControl>
        );
      }}
    </Field>
  );
}

const StyledRadioField = withStyles(
  RadioField,
  {
    shrink: {
      transform: "scale(0.85)"
    },
    formControl: {
      position: "inherit"
    },
    label: {}
  },
  { name: "CoRadioField" }
);

export default StyledRadioField;
