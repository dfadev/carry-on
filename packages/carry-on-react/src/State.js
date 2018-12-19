/** @format **/
import React, { Component } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import {
  throttle,
  debounce,
  shallowEqual,
  isFunction,
  getIn
} from "carry-on-utils";

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

      if (this.props.throttle)
        this.onStateChange = throttle(this.props.throttle, this.onStateChange);
      else if (this.props.debounce)
        this.onStateChange = debounce(this.props.debounce, this.onStateChange);

      if (!this.props.constant)
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

    componentWillUnmount = () => {
      this.onStateChange.cancel && this.onStateChange.cancel();
      this.unsubscribe && this.unsubscribe();
    };

    render = () => {
      if (this.props.children) return this.props.children(this.storeState);
      if (this.props.render) return this.props.render(this.storeState);

      return null;
    };
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
    def,
    ...rest
  } = {}) => WrappedComponent => {
    const WithState = props => (
      <State
        path={isFunction(path) ? path(props) : path}
        from={isFunction(from) ? from(props) : from}
        select={state => select(state, props)}
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

  return { State, withState };
}
