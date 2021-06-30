import React from "react";
import MuiTextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";

const TextField = withStyles(
  { root: { whiteSpace: "nowrap" } },
  { name: "CoTextField" }
)(
  ({
    name,
    label = name,
    disabled: disabledProp,
    value: valueProp,
    readOnly,
    InputProps,
    ...props
  }) => (
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
  )
);

export default TextField;
