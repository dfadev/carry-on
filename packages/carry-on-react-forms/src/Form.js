/** @format **/
import React from "react";
import { State } from "carry-on-react";

export default ({ store, form = "form", children, ...rest }) => (
  <State path={form} from={store} {...rest}>
    {state => (
      <form onSubmit={state.submit} onReset={state.reset}>
        {children}
      </form>
    )}
  </State>
);
