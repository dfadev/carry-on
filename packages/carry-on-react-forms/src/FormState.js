/** @format **/
import React from "react";
import { State } from "carry-on-react";

export default ({ select, store, form = "form", children, ...rest }) => (
  <State from={store} path={form} select={select} {...rest}>
    {children}
  </State>
);
