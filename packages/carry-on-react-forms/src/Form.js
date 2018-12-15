/** @format **/
import React from "react";
import { State } from "carry-on-react";

export default ({
  from, // storeid
  form, // formid
  onSubmit,
  onReset,
  children,
  ...rest
}) => (
  <State
    select={({ [form]: { submit, reset } }) => ({ submit, reset })}
    from={from}
  >
    {({ submit, reset }) => (
      <form onSubmit={submit(onSubmit)} onReset={reset(onReset)} {...rest}>
        {children}
      </form>
    )}
  </State>
);
