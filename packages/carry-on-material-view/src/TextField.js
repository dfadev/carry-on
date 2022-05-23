import React from "react";
import MuiTextField from "@mui/material/TextField";
import { withStyles } from "tss-react/mui";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";

function TextField({
  name,
  label = name,
  disabled: disabledProp,
  value: valueProp,
  readOnly,
  InputProps,
  ...props
}) {
  return (
    <Field path={name} readOnly={readOnly}>
      {(field, store) => {
        const { element } = field;
        const { error, hasError, disabled, value } = getFieldStatus(
          field,
          store,
          valueProp,
          disabledProp
        );

        const realInputProps =
          typeof InputProps === "function" ? InputProps(field) : InputProps;

        return (
          <MuiTextField
            label={label}
            error={hasError}
            helperText={hasError && error}
            disabled={disabled}
            inputProps={{ ...element, value }}
            onBlur={element.onBlur}
            onChange={element.onChange}
            InputProps={realInputProps /* eslint-disable-line */}
            {...props}
          />
        );
      }}
    </Field>
  );
}

const StyledTextField = withStyles(
  TextField,
  { root: { whiteSpace: "nowrap" } },
  { name: "CoTextField" }
);

export default StyledTextField;
