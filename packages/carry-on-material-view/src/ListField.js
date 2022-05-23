import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import { withStyles } from "tss-react/mui";
import { withNodesToProp } from "carry-on-react";
import { Field, MemoizedFieldContextProvider } from "carry-on-react-forms";
import { getIn, mutateSet } from "carry-on-utils";
import getFieldStatus from "./getFieldStatus";

const addRowToolbarStyles = theme => ({
  leftIcon: {
    marginRight: theme.spacing(1)
  }
});

function AddRowButton({
  classes,
  onClick,
  label,
  FieldAddIcon,
  variant,
  disabled
}) {
  return (
    <Toolbar>
      <Button variant={variant} onClick={onClick} disabled={disabled}>
        <FieldAddIcon fontSize="small" className={classes.leftIcon} />
        {label}
      </Button>
    </Toolbar>
  );
}

const StyledAddRowButton = withStyles(AddRowButton, addRowToolbarStyles, {
  name: "CoRowListFieldAddRowButton"
});

function ListField({
  classes,
  name,
  add: { icon: FieldAddIcon = AddIcon, label: addLabel = "Add" } = {},
  delete: { icon: FieldDeleteIcon = DeleteForeverIcon } = {},
  max = -1,
  readOnly = false,
  disabled: disabledProp,
  hideAdd,
  hideRemove,
  dense,
  value: valueProp,
  renderItem,
  factory = {}
}) {
  return (
    <Field path={name} readOnly={readOnly} type="list">
      {(field, store) => {
        const { disabled, value } = getFieldStatus(
          field,
          store,
          valueProp,
          disabledProp
        );

        if (!value) return null;

        const {
          element: { id }
        } = field;

        return (
          <>
            <List dense={dense}>
              {value.map((item, idx) => {
                const p = `${name}[${idx}]`;

                return (
                  <ListItem key={p} id={p}>
                    <MemoizedFieldContextProvider prefix={p}>
                      {renderItem}
                    </MemoizedFieldContextProvider>
                    {!hideRemove && (
                      <IconButton
                        className={classes.closeMenuIcon}
                        onClick={() => {
                          store.set(state => {
                            const arr = getIn(state.values, name);
                            if (arr) arr.splice(idx, 1);
                          });
                        }}
                      >
                        <FieldDeleteIcon />
                      </IconButton>
                    )}
                  </ListItem>
                );
              })}
            </List>
            {!hideAdd && !field.readOnly && (max === -1 || max > value.length) && (
              <StyledAddRowButton
                disabled={disabled}
                onClick={() => {
                  store.set(state => {
                    let arr = getIn(state.values, name);
                    if (!arr) {
                      arr = [];
                      mutateSet(state.values, name, arr);
                    }

                    const type = typeof factory;
                    if (type === "object") arr.push({ ...factory });
                    else if (type === "function")
                      arr.push(factory({ id, get: store.get, set: store.set }));
                    else arr.push(factory);
                  });
                }}
                label={addLabel}
                FieldAddIcon={FieldAddIcon}
              />
            )}
          </>
        );
      }}
    </Field>
  );
}

export default withNodesToProp("renderItem")(
  withStyles(
    ListField,
    {
      closeMenuIcon: {
        marginLeft: "auto"
      }
    },
    { name: "CoListField" }
  )
);
