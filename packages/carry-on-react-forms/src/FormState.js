import React from "react";
import { State } from "carry-on-react";
import FormContext from "./FormContext";
import FieldContext from "./FieldContext";

function FormState({
  select,
  from,
  store: propStore = from,
  form: propForm,
  children = null,
  ...rest
}) {
  return (
    children && (
      <FormContext.Consumer>
        {({ store, form } = { store: propStore, form: propForm }) => (
          <FieldContext.Consumer>
            {({ prefix } = {}) => (
              <State from={store} path={form} select={select} {...rest} strict>
                {(pathedState, pathedStore) =>
                  children(pathedState, pathedStore, prefix)
                }
              </State>
            )}
          </FieldContext.Consumer>
        )}
      </FormContext.Consumer>
    )
  );
}

export default FormState;
