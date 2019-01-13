/** @format **/
import React from "react";
import { State } from "carry-on-react";
import FormContext from "./FormContext";
import plugin from "./plugin";

export default ({ store, form = "form", children, register = [], ...rest }) => (
  <FormContext.Provider value={{ store, form }}>
    <State
      path={form}
      from={store}
      register={[].concat(register).concat(plugin({ id: form, ...rest }))}
    >
      {(state = {}) => (
        <form onSubmit={state.submit} onReset={state.reset}>
          {children}
        </form>
      )}
    </State>
  </FormContext.Provider>
);
