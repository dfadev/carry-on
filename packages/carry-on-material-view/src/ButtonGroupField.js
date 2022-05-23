import React from "react";
import { withStyles } from "tss-react/mui";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";
import eventHandler from "./eventHandler";

function ButtonGroupField({
  name,
  label = null,
  value: valueProp,
  disabled: disabledProp,
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

        let idIndex = 0;

        const buttonGroup = (
          <ButtonGroup value={value} disabled={disabled}>
            {buttons.map(
              ({
                value: val,
                content,
                onClick,
                // eslint-disable-next-line no-plusplus
                id = `${field.element.id}[${idIndex++}]`,
                ...rest
              }) => (
                <Button
                  key={id}
                  id={id}
                  value={val}
                  onClick={eventHandler(onClick, id, val, store)}
                  {...rest}
                >
                  {content}
                </Button>
              )
            )}
          </ButtonGroup>
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

const StyledButtonGroupField = withStyles(
  ButtonGroupField,
  {},
  { name: "CoButtonGroupField" }
);

export default StyledButtonGroupField;
