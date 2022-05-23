import React from "react";
import Fab from "@mui/material/Fab";
import { withStyles } from "tss-react/mui";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";
import eventHandler from "./eventHandler";

function FabField({
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
          <Fab
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
          </Fab>
        );
      }}
    </Field>
  );
}

const StyledFabField = withStyles(FabField, {}, { name: "CoFabField" });

export default StyledFabField;
