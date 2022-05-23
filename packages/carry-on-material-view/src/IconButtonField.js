import React from "react";
import IconButton from "@mui/material/IconButton";
import { withStyles } from "tss-react/mui";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";
import eventHandler from "./eventHandler";

function IconButtonField({
  name,
  label = name,
  value: valueProp,
  disabled: disabledProp,
  onClick,
  children,
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
          <IconButton
            {...props}
            disabled={disabled}
            id={field.element.id}
            value={value}
            onClick={eventHandler(
              onClick,
              props.id || field.element.id,
              value,
              store
            )}
          >
            {children || label}
          </IconButton>
        );
      }}
    </Field>
  );
}

const StyledIconButtonField = withStyles(
  IconButtonField,
  {},
  { name: "CoIconButtonField" }
);

export default StyledIconButtonField;
