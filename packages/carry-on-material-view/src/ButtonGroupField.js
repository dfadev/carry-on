import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";
import eventHandler from "./eventHandler";

const ButtonGroupField = withStyles(
  {},
  { name: "CoButtonGroupField" }
)(
  ({
    name,
    label = null,
    value: valueProp,
    disabled: disabledProp,
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
  )
);

export default ButtonGroupField;
