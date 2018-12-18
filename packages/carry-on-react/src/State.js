/** @format **/
import React, { Component } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import { shallowEqual, isFunction, getIn } from "./utils";

export default function makeStateComponents({
  useStore,
  defaultId,
  subscribe
}) {
  class State extends Component {
    constructor(props) {
      super(props);
      const { from, select, path, default: def } = props;
      this.stateSelect = state => select(getIn(state, path, def));
      this.storeState = this.stateSelect(useStore(from).state);
      this.unsubscribe = subscribe(from, this.onStateChange);
    }

    onStateChange = state => {
      const nextState = this.stateSelect(state);
      if (!shallowEqual(nextState, this.storeState)) {
        this.storeState = nextState;
        this.forceUpdate();
      } else {
        this.storeState = nextState;
      }
    };

    componentWillUnmount = () => this.unsubscribe();

    render = () =>
      this.props.children ? this.props.children(this.storeState) : null;
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
    WithState.displayName = `withState(${WrappedComponent.displayName ||
      WrappedComponent.name})`;
    WithState.WrappedComponent = WrappedComponent;

    return hoistNonReactStatic(WithState, WrappedComponent);
  };

  return { State, withState };
}
