import React from "react";
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";
import eventHandler from "./eventHandler";

const IconButtonField = withStyles(
  {},
  { name: "CoIconButtonField" }
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
            {label}
          </IconButton>
        );
      }}
    </Field>
  )
);

export default IconButtonField;
