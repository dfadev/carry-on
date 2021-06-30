import React from "react";
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field } from "carry-on-react-forms";

const SubmitIconField = withStyles(
  {},
  { name: "CoSubmitIconField" }
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
      <IconButton
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
      </IconButton>
    )}
  </Field>
));

export default SubmitIconField;
