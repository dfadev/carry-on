/** @format **/
import React from "react";
import { State } from "carry-on-react";

export default ({ select, store, form = "form", children }) => (
  <State
    from={store}
    select={state => (select ? select(state[form]) : state[form])}
  >
    {children}
  </State>
);
