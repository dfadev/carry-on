import React from "react";
import Fab from "@mui/material/Fab";
import { withStyles } from "tss-react/mui";
import { Field } from "carry-on-react-forms";

function SubmitFabField({ name, label = "Submit", ...props }) {
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
        <Fab
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
        </Fab>
      )}
    </Field>
  );
}

const StyledSubmitFabField = withStyles(
  SubmitFabField,
  {},
  { name: "CoSubmitFabField" }
);

export default StyledSubmitFabField;
