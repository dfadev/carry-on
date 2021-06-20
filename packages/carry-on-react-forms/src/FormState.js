import React from "react";
import { State } from "carry-on-react";
import FormContext from "./FormContext";

export default ({
  select,
  from,
  store: propStore = from,
  form: propForm,
  children,
  ...rest
}) => (
  <FormContext.Consumer>
    {({ store, form } = { store: propStore, form: propForm }) => (
      <State from={store} path={form} select={select} {...rest} strict>
        {children}
      </State>
    )}
  </FormContext.Consumer>
);
