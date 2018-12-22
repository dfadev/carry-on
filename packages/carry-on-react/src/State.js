/** @format **/
import React, { Component } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import {
  throttle,
  debounce,
  isFunction,
  getIn,
  mutateSet
} from "carry-on-utils";
import { spreadGuardsEnabled, proxyState, deproxify } from "proxyequal";

// if this is enabled, proxyequal mutates state with an additional property
spreadGuardsEnabled(false);

function compareChanges(changes, affected) {
  const queue = [];
  queue.push({ changes, affected });

  while (queue.length > 0) {
    const item = queue.pop();
    const entries = item.changes;
    for (let i = 0, len = entries.length; i < len; i++) {
      const entry = entries[i];
      const key = entry.key;
      const affectedValue = item.affected[key];
      if (affectedValue === true) return true;
      if (affectedValue !== undefined) {
        const nextChanges = entry.changes;
        if (nextChanges === true) return true;
        queue.push({
          changes: nextChanges,
          affected: affectedValue
        });
      }
    }
  }

  return false;
}

export default function makeStateComponents({
  useStore,
  defaultId,
  subscribe
}) {
  class State extends Component {
    affectedStateKeys = undefined;

    constructor(props) {
      super(props);
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
      const trappedState = proxyState(pathedState);
      const selectedState = select(trappedState.state);
      //trappedState.seal(); // this doesn't seem to remove the extra prop
      const affected = trappedState.affected;
      const deproxified = deproxify(selectedState);
      const finalState =
        deproxified !== undefined ? deproxified : selectedState;

      if (affected !== undefined) {
        this.affectedStateKeys = {};
        for (let i = 0; i < affected.length; i++)
          mutateSet(this.affectedStateKeys, path + affected[i], true);
      } else this.affectedStateKeys = undefined;

      return finalState;
    };

    trapSelect = state => {
      if (!this.props.select) return state;
      return this.trapStateQuery(
        state,
        this.props.path,
        this.props.default,
        this.props.select
      );
    };

    trapRender = renderFn => {
      if (this.prevStoreState === this.storeState)
        return this.prevFinalRenderedState;

      if (this.props.constant && this.prevFinalRenderedState)
        return this.prevFinalRenderedState;

      const finalRenderedState = this.trapStateQuery(
        this.storeState,
        this.props.path,
        this.props.default,
        renderFn
      );

      this.prevStoreState = this.storeState;
      this.prevFinalRenderedState = finalRenderedState;
      return finalRenderedState;
    };

    render() {
      const renderFn = this.props.children || this.props.render;
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
