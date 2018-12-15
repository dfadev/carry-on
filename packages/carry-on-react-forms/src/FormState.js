/** @format **/
import React from "react";
import { State } from "carry-on-react";

export default ({ select, from, form, children }) => (
  <State
    from={from}
    select={state => (select ? select(state[form]) : state[form])}
  >
    {children}
  </State>
);
