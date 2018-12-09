/** @format **/
import React, { memo } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import { isFunction, getIn } from "./utils";

export default function makeStateComponents({ useStore, defaultId }) {
  // memoized children render function
  const Comp = memo(
    ({ children, value }) => (children ? children(value) : null)
  );

  const State = ({ from, path, select, children, default: def }) => {
    const { Consumer } = useStore(from).Context;
    return (
      <Consumer>
        {state => (
          <Comp value={select(getIn(state, path, def))}>{children}</Comp>
        )}
      </Consumer>
    );
  };

  State.defaultProps = {
    select: state => state,
    from: defaultId,
    path: ""
  };

  // a HOC that wraps the State component
  const withState = ({
    select = state => state,
    from,
    path,
    def
  } = {}) => WrappedComponent => {
    const WithState = props => (
      <State
        path={isFunction(path) ? path(props) : path}
        from={isFunction(from) ? from(props) : from}
        select={state => select(state, props)}
        default={isFunction(def) ? def(props) : def}
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
    return hoistNonReactStatic(WithState, WrappedComponent);
  };

  return { State, withState };
}
