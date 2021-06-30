import React from "react";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field } from "carry-on-react-forms";

const ResetButtonField = withStyles(
  {},
  { name: "CoResetButtonField" }
)(({ name, label = name, ...props }) => (
  <Field path={name} type="reset">
    {({
      element,
      form: { isSubmitting, isValidating, reset, isPristine } = {}
    }) => (
      <Button
        {...props}
        disabled={isSubmitting || isValidating || isPristine}
        {...element}
        onClick={reset}
      >
        {label}
      </Button>
    )}
  </Field>
));

export default ResetButtonField;
