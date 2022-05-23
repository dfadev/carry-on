import React from "react";
import MuiTextField from "@mui/material/TextField";
import { withStyles } from "tss-react/mui";
import { Rifm } from "rifm";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";

function MaskedTextField({
  name,
  label = name,
  format,
  refuse,
  accept,
  mask,
  disabled: disabledProp,
  value: valueProp,
  readOnly = false,
  InputProps,
  ...props
}) {
  return (
    <Field path={name} readOnly={readOnly}>
      {(field, store, prefix) => {
        const { error, hasError, disabled, value } = getFieldStatus(
          field,
          store,
          valueProp,
          disabledProp
        );

        const realInputProps =
          typeof InputProps === "function"
            ? InputProps(field, store, prefix)
            : InputProps;

        return (
          <Rifm
            accept={accept}
            mask={mask && mask(value)}
            refuse={refuse}
            value={value}
            onChange={field.setValue}
            format={format}
          >
            {({ value: maskedValue, onChange }) => (
              <MuiTextField
                label={label}
                onBlur={field.onBlur}
                onChange={onChange}
                error={hasError}
                helperText={hasError && error}
                disabled={disabled}
                inputProps={{ ...field.element, value: maskedValue }}
                InputProps={realInputProps /* eslint-disable-line */}
                value={maskedValue}
                {...props}
              />
            )}
          </Rifm>
        );
      }}
    </Field>
  );
}

const StyledMaskedTextField = withStyles(
  MaskedTextField,
  {},
  { name: "CoMaskedTextField" }
);

export default StyledMaskedTextField;
