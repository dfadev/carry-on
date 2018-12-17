/** @format **/
import React, { memo } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import { isFunction, getIn } from "./utils";

export default function makeStateComponents({
  useStore,
  defaultId,
  subscribe
}) {
  // memoized children render function
  const Comp = memo(
    ({ children, ...values }) =>
      children
        ? children(
            values !== undefined &&
            Object.prototype.hasOwnProperty.call(
              values,
              "carryOnReactNonObject"
            )
              ? values.carryOnReactNonObject
              : values
          )
        : null
  );

  const asProps = val =>
    val instanceof Object && !Array.isArray(val)
      ? val
      : { carryOnReactNonObject: val };

  const ContextState = ({ from, path, select, children, default: def }) => {
    const { Consumer } = useStore(from).Context;
    return (
      <Consumer>
        {state => (
          <Comp {...asProps(select(getIn(state, path, def)))}>{children}</Comp>
        )}
      </Consumer>
    );
  };

  class State extends React.Component {
    constructor(props) {
      super(props);
      const { from, select, path, default: def } = props;
      this.storeState = select(getIn(useStore(from).state, path, def));
      this.unsubscribe = subscribe(from, this.onStateChange);
    }

    shouldComponentUpdate = () => false;

    onStateChange = state => {
      const { select, path, default: def } = this.props;
      this.storeState = select(getIn(state, path, def));
      this.forceUpdate();
    };

    componentWillUnmount = () => {
      this.unsubscribe();
    };

    render = () => (
      <Comp {...asProps(this.storeState)}>{this.props.children}</Comp>
    );
  }

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

  // a HOC that wraps the State component
  const withContextState = ({
    select = state => state,
    from,
    path,
    def
  } = {}) => WrappedComponent => {
    const WithContextState = props => (
      <ContextState
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
      </ContextState>
    );
    return hoistNonReactStatic(WithContextState, WrappedComponent);
  };

  return { ContextState, withContextState, State, withState };
}
