import React from "react";
import { withStyles } from "tss-react/mui";
import { Field } from "carry-on-react-forms";

function DataField({ name, value, transform }) {
  return (
    <Field path={name} readOnly>
      {(field, store) => {
        let fieldValue;
        if (value !== undefined) {
          fieldValue =
            typeof value === "function" ? value(field, store) : value;
        } else {
          fieldValue = field.element.value;
        }

        if (transform) fieldValue = transform(fieldValue);

        return fieldValue;
      }}
    </Field>
  );
}

const StyledDataField = withStyles(DataField, {}, { name: "CoDataField" });

export default StyledDataField;
