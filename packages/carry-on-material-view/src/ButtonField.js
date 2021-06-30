import React from "react";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";
import eventHandler from "./eventHandler";

const ButtonField = withStyles(
  {},
  { name: "CoButtonField" }
)(
  ({
    name,
    label = name,
    value: valueProp,
    disabled: disabledProp,
    onClick,
    ...props
  }) => (
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
  )
);

export default ButtonField;
