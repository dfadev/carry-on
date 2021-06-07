import React from "react";
import { State } from "carry-on-react";
import FormContext from "./FormContext";
import plugin from "./plugin";

export default ({
  from,
  store = from,
  id = "form",
  children,
  register = [],
  // plugin
  initialValues,
  onValidate,
  onSubmit,
  onReset,
  // State
  debug,
  verbose,
  onMount,
  onUnmount,
  noFormTag
}) => (
  <FormContext.Provider value={{ store, form: id }}>
    <State
      path={id}
      from={store}
      register={[]
        .concat(register)
        .concat(plugin({ id, initialValues, onValidate, onSubmit, onReset }))}
      debug={debug}
      verbose={verbose}
      onMount={onMount}
      onUnmount={onUnmount}
    >
      {state => noFormTag ? children : (
        <form id={id} onSubmit={state.submit} onReset={state.reset}>
          {children}
        </form>
      )}
    </State>
  </FormContext.Provider>
);
