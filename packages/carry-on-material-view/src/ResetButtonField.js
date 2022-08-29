import React from "react";
import Button from "@mui/material/Button";
import { withStyles } from "tss-react/mui";
import { Field } from "carry-on-react-forms";

function ResetButtonField({ name, label = name, ...props }) {
  return (
    <Field path={name} type="reset">
      {({
        element,
        form: { isSubmitting, reset, isPristine } = {}
      }) => (
        <Button
          {...props}
          disabled={isSubmitting || isPristine}
          {...element}
          onClick={reset}
        >
          {label}
        </Button>
      )}
    </Field>
  );
}

const StyledResetButtonField = withStyles(
  ResetButtonField,
  {},
  { name: "CoResetButtonField" }
);

export default StyledResetButtonField;
