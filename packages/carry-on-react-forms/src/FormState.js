/** @format **/
import React from "react";
import { State } from "carry-on-react";

export default ({ select, store, form = "form", children }) => (
  <State from={store} path={form} select={select}>
    {children}
  </State>
);
