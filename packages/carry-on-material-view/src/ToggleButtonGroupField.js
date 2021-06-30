import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Grid from "@material-ui/core/Grid";
import { Field } from "carry-on-react-forms";
import { deproxify } from "carry-on-utils";
import getFieldStatus from "./getFieldStatus";
import eventHandler from "./eventHandler";

const ToggleButtonGroupField = withStyles(
  {},
  { name: "CoToggleButtonGroupField" }
)(
  ({
    name,
    label = name,
    value: valueProp,
    disabled: disabledProp,
    onChange,
    exclusive,
    neverNull,
    buttons
  }) => (
    <Field path={name}>
      {(field, store) => {
        if (!buttons || buttons.length === 0) return null;

        const { disabled, value } = getFieldStatus(
          field,
          store,
          valueProp,
          disabledProp
        );

        const { element: { id } } = field;
        const onFieldChange = (e, val) => {
          if (!neverNull || val !== null) {
            field.setValue(val);
            eventHandler(onChange, id, val, store)(e);
          }
        };

        const buttonGroup = (
          <ToggleButtonGroup
            value={value}
            disabled={disabled}
            exclusive={exclusive}
            onChange={onFieldChange}
          >
            {buttons.map(({ value: val, content, ...rest }, idx) => (
              <ToggleButton
                key={idx /* eslint-disable-line */}
                value={deproxify(val)}
                {...rest}
              >
                {content}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        );

        if (label !== undefined && label !== null) {
          return (
            <Grid container spacing={1}>
              <Grid item xs={12}>
                {label}
              </Grid>
              <Grid item>{buttonGroup}</Grid>
            </Grid>
          );
        }

        return buttonGroup;
      }}
    </Field>
  )
);

export default ToggleButtonGroupField;
