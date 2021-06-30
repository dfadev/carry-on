import React from "react";
import Fab from "@material-ui/core/Fab";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";
import eventHandler from "./eventHandler";

const FabField = withStyles(
  {},
  { name: "CoFabField" }
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
  )
);

export default FabField;
