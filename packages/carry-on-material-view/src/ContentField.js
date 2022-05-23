import React from "react";
import { withStyles } from "tss-react/mui";
import { Field } from "carry-on-react-forms";

function ContentField({ name, content }) {
  return (
    <Field path={name}>
      {field =>
        content === undefined && content !== null
          ? field.element.value
          : content
      }
    </Field>
  );
}

const StyledContentField = withStyles(
  ContentField,
  {},
  { name: "CoContentField" }
);

export default StyledContentField;
