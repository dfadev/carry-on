/** @format **/
import React from "react";
import { State } from "carry-on-react";

export default ({ select, from, children }) => (
  <State from={from} select={({ form }) => (select ? select(form) : form)}>
    {children}
  </State>
);
