/** @format **/
import React, { Component } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import {
  throttle,
  debounce,
  shallowEqual,
  isFunction,
  getIn,
  mutateSet
} from "carry-on-utils";
import { spreadGuardsEnabled, proxyState, deproxify } from "proxyequal";

// primary simplification: remove select property (keep path)
// but this requires usage of immer for state change tracking

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

      // must trap select because we don't know if changes are being tracked yet
      const init = useStore(from).state;

      // need to handle default value here?
      this.storeState = this.props.select ? this.trapSelect(init) : init;

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
      // handle state change with tracking
      if (changes) {
        this.storeState = this.props.select ? this.trapSelect(state) : state;
        this.forceUpdate();
        return;
      }

      // handle state change with no tracking
      // could use proxy equals here?
      const select = this.props.select || (s => s);
      const nextState = select(
        getIn(state, this.props.path, this.props.default)
      );
      if (!shallowEqual(nextState, this.storeState)) {
        this.storeState = nextState;
        this.forceUpdate();
      } else this.storeState = nextState;
    };

    stateSubscriber = (state, changes) =>
      (changes === undefined ||
        this.affectedStateKeys === undefined ||
        compareChanges(changes, this.affectedStateKeys)) &&
      this.onStateChange(state, changes);

    trapStateQuery = (state, path, def, select) => {
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
      if (this.props.select === undefined) return state;
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
