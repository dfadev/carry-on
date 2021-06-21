import React from "react";
import { State, withNodesToProps } from "carry-on-react";
import FormContext from "./FormContext";
import plugin from "./plugin";

const Form = ({
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
      {(form, { id: storeId }) =>
        noFormTag ? (
          children
        ) : (
          <form
            id={`${storeId ? `${storeId}.` : ""}${id}`}
            onSubmit={form.submit}
            onReset={form.reset}
          >
            {children}
          </form>
        )
      }
    </State>
  </FormContext.Provider>
);

Form.composes = [
  "initialValues",
  "register",
  "onMount",
  "onUnmount",
  "debug",
  "verbose",
  "id"
];

export default withNodesToProps(Form);
