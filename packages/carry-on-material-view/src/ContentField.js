import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field } from "carry-on-react-forms";

const ContentField = withStyles(
  {},
  { name: "CoContentField" }
)(({ name, content }) => (
  <Field path={name}>
    {field =>
      content === undefined && content !== null ? field.element.value : content
    }
  </Field>
));

export default ContentField;
