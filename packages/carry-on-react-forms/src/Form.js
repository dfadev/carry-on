/** @format **/
import React from "react";
import { State, Store } from "carry-on-react";
import form from "./plugin";

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
  <Store id={id} plugins={[form({ init, validate: onValidate }), ...plugins]}>
    <State
      select={({ form: { submit, reset } }) => ({ submit, reset })}
      from={id}
    >
      {({ submit, reset }) => (
        <form onSubmit={submit(onSubmit)} onReset={reset(onReset)} {...rest}>
          {children}
        </form>
      )}
    </State>
  </Store>
);
