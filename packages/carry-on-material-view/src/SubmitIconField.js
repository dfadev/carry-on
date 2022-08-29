import React from "react";
import IconButton from "@mui/material/IconButton";
import { withStyles } from "tss-react/mui";
import { Field } from "carry-on-react-forms";

function SubmitIconField({ name, label = "Submit", ...props }) {
  return (
    <Field path={name} type="submit">
      {({
        element,
        form: {
          isSubmitting,
          isValid,
          isPristine,
          errors,
          submit
        } = {}
      }) => (
        <IconButton
          onClick={submit}
          disabled={
            isSubmitting ||
            !isValid ||
            (isPristine && errors && Object.keys(errors).length > 0)
          }
          {...element}
          {...props}
        >
          {label}
        </IconButton>
      )}
    </Field>
  );
}

const StyledSubmitIconField = withStyles(
  SubmitIconField,
  {},
  { name: "CoSubmitIconField" }
);

export default StyledSubmitIconField;
