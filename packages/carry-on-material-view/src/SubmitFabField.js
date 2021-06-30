import React from "react";
import Fab from "@material-ui/core/Fab";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field } from "carry-on-react-forms";

const SubmitFabField = withStyles(
  {},
  { name: "CoSubmitFabField" }
)(({ name, label = "Submit", ...props }) => (
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
));

export default SubmitFabField;
