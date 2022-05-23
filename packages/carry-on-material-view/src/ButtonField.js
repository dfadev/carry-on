import React from "react";
import Button from "@mui/material/Button";
import { withStyles } from "tss-react/mui";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";
import eventHandler from "./eventHandler";

function ButtonField({
  name,
  label = name,
  value: valueProp,
  disabled: disabledProp,
  onClick,
  ...props
}) {
  return (
    <Field path={name} type="button">
      {(field, store) => {
        const { disabled, value } = getFieldStatus(
          field,
          store,
          valueProp,
          disabledProp
        );

        return (
          <Button
            {...props}
            disabled={disabled}
            {...field.element}
            value={value}
            onClick={eventHandler(
              onClick,
              props.id || field.element.id,
              value,
              store
            )}
          >
            {label}
          </Button>
        );
      }}
    </Field>
  );
}

const StyledButtonField = withStyles(
  ButtonField,
  {},
  { name: "CoButtonField" }
);

export default StyledButtonField;
