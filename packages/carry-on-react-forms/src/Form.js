/** @format **/
import React from "react";
import { State } from "carry-on-react";
import FormContext from "./FormContext";
import plugin from "./plugin";

export default ({ store, id = "form", children, register = [], ...rest }) => (
  <FormContext.Provider value={{ store, form: id }}>
    <State
      path={id}
      from={store}
      register={[].concat(register).concat(plugin({ id, ...rest }))}
    >
      {(state = {}) => (
        <form onSubmit={state.submit} onReset={state.reset}>
          {children}
        </form>
      )}
    </State>
  </FormContext.Provider>
);
