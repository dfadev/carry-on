import React from "react";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";

const RadioField = withStyles(
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
)(
  ({
    classes = {},
    name,
    readOnly,
    label = name,
    options,
    row,
    disabled: disabledProp,
    value: valueProp,
    j = 0
  }) => (
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
  )
);

export default RadioField;
