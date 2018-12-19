/** @format **/
import React from "react";
import { State } from "carry-on-react";

export default ({
  store, // storeid
  form = "form", // formid
  children,
  ...rest
}) => (
  <State
    path={form}
    select={({ submit, reset }) => ({ submit, reset })}
    from={store}
    {...rest}
  >
    {({ submit, reset }) => (
      <form onSubmit={submit} onReset={reset}>
        {children}
      </form>
    )}
  </State>
);
