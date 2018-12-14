/** @format **/
import React from "react";
import { State, Store } from "carry-on-react";
import forms from "./plugin";

export default ({
  id,
  init,
  onSubmit,
  onReset,
  onValidate,
  children,
  plugins = [],
  ...rest
}) => (
  <Store
    id={id}
    init={init}
    plugins={[forms(onSubmit, onReset, onValidate), ...plugins]}
  >
    <State
      select={({ form: { submit, reset } }) => ({ submit, reset })}
      from={id}
    >
      {({ submit, reset }) => (
        <form onSubmit={submit} onReset={reset} {...rest}>
          {children}
        </form>
      )}
    </State>
  </Store>
);
