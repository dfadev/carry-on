/** @format **/
import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import { isFunction } from "carry-on-utils";
import State from "./State";

// a HOC that wraps the State component
export default ({
  select,
  from,
  path,
  def,
  ...rest
} = {}) => WrappedComponent => {
  const WithState = props => (
    <State
      path={isFunction(path) ? path(props) : path}
      from={isFunction(from) ? from(props) : from}
      select={select && (state => select(state, props))}
      default={isFunction(def) ? def(props) : def}
      {...rest}
    >
      {state => {
        const val = state && state.valueOf();
        return val instanceof Object && !Array.isArray(state) ? (
          <WrappedComponent {...props} {...state} />
        ) : (
          <WrappedComponent {...props} state={state} />
        );
      }}
    </State>
  );
  WithState.displayName = `withState(${WrappedComponent.displayName ||
    WrappedComponent.name})`;
  WithState.WrappedComponent = WrappedComponent;

  return hoistNonReactStatic(WithState, WrappedComponent);
};
