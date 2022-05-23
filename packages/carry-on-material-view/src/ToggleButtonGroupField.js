import React from "react";
import { withStyles } from "tss-react/mui";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import { Field } from "carry-on-react-forms";
import { deproxify } from "carry-on-utils";
import getFieldStatus from "./getFieldStatus";
import eventHandler from "./eventHandler";

function ToggleButtonGroupField({
  name,
  label = name,
  value: valueProp,
  disabled: disabledProp,
  onChange,
  exclusive,
  neverNull,
  buttons
}) {
  return (
    <Field path={name}>
      {(field, store) => {
        if (!buttons || buttons.length === 0) return null;

        const { disabled, value } = getFieldStatus(
          field,
          store,
          valueProp,
          disabledProp
        );

        const {
          element: { id }
        } = field;
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
  );
}

const StyledToggleButtonGroupField = withStyles(
  ToggleButtonGroupField,
  {},
  { name: "CoToggleButtonGroupField" }
);

export default StyledToggleButtonGroupField;
