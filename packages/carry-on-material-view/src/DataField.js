import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field } from "carry-on-react-forms";

const DataField = withStyles(
  {},
  { name: "CoDataField" }
)(({ name, value, transform }) => (
  <Field path={name} readOnly>
    {(field, store) => {
      let fieldValue;
      if (value !== undefined) {
        fieldValue = typeof value === "function" ? value(field, store) : value;
      } else {
        fieldValue = field.element.value;
      }

      if (transform) fieldValue = transform(fieldValue);

      return fieldValue;
    }}
  </Field>
));

export default DataField;
