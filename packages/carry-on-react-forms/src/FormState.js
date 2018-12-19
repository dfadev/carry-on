/** @format **/
import React from "react";
import { State } from "carry-on-react";

export default ({
  select,
  store,
  form = "form",
  children,
  throttle,
  debounce
}) => (
  <State
    from={store}
    path={form}
    select={select}
    throttle={throttle}
    debounce={debounce}
  >
    {children}
  </State>
);
