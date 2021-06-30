import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Toolbar from "@material-ui/core/Toolbar";
import withStyles from "@material-ui/core/styles/withStyles";
import { withNodesToProp } from "carry-on-react";
import { Field, FieldContext } from "carry-on-react-forms";
import { getIn, mutateSet } from "carry-on-utils";
import getFieldStatus from "./getFieldStatus";

const addRowToolbarStyles = theme => ({
  leftIcon: {
    marginRight: theme.spacing(1)
  }
});

const AddRowButton = withStyles(addRowToolbarStyles, {
  name: "CoRowListFieldAddRowButton"
})(({ classes, onClick, label, FieldAddIcon, variant, disabled }) => (
  <Toolbar>
    <Button variant={variant} onClick={onClick} disabled={disabled}>
      <FieldAddIcon fontSize="small" className={classes.leftIcon} />
      {label}
    </Button>
  </Toolbar>
));

const ListField = ({
  classes,
  name,
  add: { icon: FieldAddIcon = AddIcon, label: addLabel = "Add" } = {},
  delete: { icon: FieldDeleteIcon = DeleteForeverIcon } = {},
  max = -1,
  readOnly = false,
  defaultValues = {},
  disabled: disabledProp,
  hideRemove,
  dense,
  value: valueProp,
  renderItem
}) => (
  <Field path={name} readOnly={readOnly} type="list">
    {(field, store) => {
      const { disabled, value } = getFieldStatus(
        field,
        store,
        valueProp,
        disabledProp
      );

      if (!value) return null;

      return (
        <>
          <List dense={dense}>
            {value.map((item, idx) => {
              const p = `${name}[${idx}]`;

              return (
                <ListItem key={p} id={p}>
                  <FieldContext.Provider value={{ prefix: p }}>
                    {renderItem}
                  </FieldContext.Provider>
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
          {!field.readOnly && (max === -1 || max > value.length) && (
            <AddRowButton
              disabled={disabled}
              onClick={() => {
                store.set(state => {
                  let arr = getIn(state.values, name);
                  if (!arr) {
                    arr = [];
                    mutateSet(state.values, name, arr);
                  }

                  const type = typeof defaultValues;
                  if (type === "object") arr.push({ ...defaultValues });
                  else if (type === "function") arr.push(defaultValues(store));
                  else arr.push(defaultValues);
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

export default withNodesToProp("renderItem")(
  withStyles(
    {
      closeMenuIcon: {
        marginLeft: "auto"
      }
    },
    { name: "CoListField" }
  )(ListField)
);
