import React from "react";
import MuiTextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import { Rifm } from "rifm";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";

const MaskedTextField = withStyles(
  {},
  { name: "CoMaskedTextField" }
)(
  ({
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
  }) => (
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
  )
);

export default MaskedTextField;
