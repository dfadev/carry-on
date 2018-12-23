/** @format **/
import { Component } from "react";
import { throttle, debounce, getIn, mutateSet } from "carry-on-utils";
import {
  useStore,
  connect,
  subscribe,
  trackChanges,
  compareChanges
} from "carry-on-store";

export default class State extends Component {
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
      const { finalState, affected } = trackChanges(pathedState, select);
      this.affectedStateKeys = path ? mutateSet({}, path, affected) : affected;
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

    if (this.props.constant && this.prevFinalState) return this.prevFinalState;

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
  path: ""
};
