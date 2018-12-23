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
import ReactDOM from "react-dom";

export default class State extends Component {
  constructor(props) {
    super(props);
    const { from, throttle: t, debounce: d, constant } = props;

    connect(
      from,
      ReactDOM.unstable_batchedUpdates
    );

    this.storeState = this.trapSelect(useStore(from).query());

    if (t) this.onStateChange = throttle(t, this.onStateChange);
    else if (d) this.onStateChange = debounce(d, this.onStateChange);

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

  trapStateQuery = (state, select) => {
    const { path, default: def, constant } = this.props;
    const pathedState = getIn(state, path, def);
    if (constant) return select(pathedState);

    if (this.props.strict || this.affectedStateKeys === undefined) {
      const { finalState, affected } = trackChanges(pathedState, select);
      this.affectedStateKeys = path ? mutateSet({}, path, affected) : affected;
      return finalState;
    }

    return select(pathedState);
  };

  trapSelect = state => {
    if (!this.props.select) return state;
    return this.trapStateQuery(state, this.props.select);
  };

  trapRender = renderFn => {
    if (this.prevStoreState === this.storeState) return this.prevFinalState;
    if (this.props.constant && this.prevFinalState) return this.prevFinalState;

    const finalState = this.trapStateQuery(this.storeState, renderFn);
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
