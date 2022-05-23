import React from "react";
import Button from "@mui/material/Button";
import { withStyles } from "tss-react/mui";
import { Field } from "carry-on-react-forms";

function SubmitButtonField({ name, label = "Submit", ...props }) {
  return (
    <Field path={name} type="submit">
      {({
        element,
        form: {
          isSubmitting,
          isValidating,
          isValid,
          isPristine,
          errors,
          submit
        } = {}
      }) => (
        <Button
          onClick={submit}
          disabled={
            isSubmitting ||
            isValidating ||
            !isValid ||
            (isPristine && errors && Object.keys(errors).length > 0)
          }
          {...element}
          {...props}
        >
          {label}
        </Button>
      )}
    </Field>
  );
}

const StyledSubmitButtonField = withStyles(
  SubmitButtonField,
  {},
  { name: "CoSubmitButtonField" }
);

export default StyledSubmitButtonField;
