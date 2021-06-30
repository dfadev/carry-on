import React from "react";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field } from "carry-on-react-forms";

const SubmitButtonField = withStyles(
  {},
  { name: "CoSubmitButtonField" }
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
));

export default SubmitButtonField;
