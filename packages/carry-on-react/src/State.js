/** @format **/
import React, { Component } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import { throttle, debounce, isFunction, getIn } from "carry-on-utils";
import { spreadGuardsEnabled, proxyState, deproxify } from "proxyequal";
import { compareChanges, createAffectedKeysIndex } from "./changeTracking";

// if this is enabled, proxyequal mutates state with an additional property
spreadGuardsEnabled(false);

export default function makeStateComponents({
  useStore,
  connect,
  defaultId,
  subscribe
}) {
  class State extends Component {
    affectedStateKeys = undefined;

    constructor(props) {
      super(props);
      connect(props.from);

      const {
        from,
        throttle: throttleTimeout,
        debounce: debounceTimeout,
        constant
      } = this.props;

      const init = useStore(from).state;
      this.storeState = this.trapSelect(init);

      if (throttleTimeout)
        this.onStateChange = throttle(throttleTimeout, this.onStateChange);
      else if (debounceTimeout)
        this.onStateChange = debounce(debounceTimeout, this.onStateChange);

      if (!constant) this.unsubscribe = subscribe(from, this.stateSubscriber);
    }

    componentWillUnmount() {
      this.onStateChange.cancel && this.onStateChange.cancel();
      this.unsubscribe && this.unsubscribe();
    }

    onStateChange = (state, changes) => {
      if (!changes || changes.length === 0) return;
      this.storeState = this.trapSelect(state);
      this.forceUpdate();
    };

    stateSubscriber = (state, changes) =>
      compareChanges(changes, this.affectedStateKeys) &&
      this.onStateChange(state, changes);

    trapStateQuery = (state, path, def, select, constant) => {
      if (constant) {
        const pathedState = getIn(state, path, def);
        const selectedState = select(pathedState);
        return selectedState;
      }

      const pathedState = getIn(state, path, def);

      if (this.props.strict || this.affectedStateKeys === undefined) {
        const trappedState = proxyState(pathedState);
        const selectedState = select(trappedState.state);
        trappedState.seal(); // this doesn't seem to remove the extra prop
        const affected = trappedState.affected;
        const deproxified = deproxify(selectedState);
        const finalState =
          deproxified !== undefined ? deproxified : selectedState;

        this.affectedStateKeys = createAffectedKeysIndex(path, affected);

        return finalState;
      }

      return select(pathedState);
    };

    trapSelect = state => {
      if (!this.props.select) return state;
      const { path, default: def, select, constant } = this.props;
      return this.trapStateQuery(state, path, def, select, constant);
    };

    trapRender = renderFn => {
      if (this.prevStoreState === this.storeState) return this.prevFinalState;

      if (this.props.constant && this.prevFinalState)
        return this.prevFinalState;

      const { path, default: def, constant } = this.props;
      const finalState = this.trapStateQuery(
        this.storeState,
        path,
        def,
        renderFn,
        constant
      );

      this.prevStoreState = this.storeState;
      this.prevFinalState = finalState;
      return finalState;
    };

    render() {
      const renderFn = this.props.children || this.props.render;
      if (!renderFn) return null;
      return this.props.select
        ? renderFn(this.storeState)
        : this.trapRender(renderFn);
    }
  }

  State.defaultProps = {
    from: defaultId,
    path: ""
  };

  // a HOC that wraps the State component
  const withState = ({
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

  return { State, withState };
}
