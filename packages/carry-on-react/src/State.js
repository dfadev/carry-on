/** @format **/
import { Component } from "react";
import { logger, throttle, debounce, getIn } from "carry-on-utils";
import { register, connect, subscribe, watchGet } from "carry-on-store";
import ReactDOM from "react-dom";

export default class State extends Component {
  static Debug = false;

  static Verbose = false;

  constructor(props) {
    super(props);
    this.setupDebug();

    const { from, throttle: t, debounce: d } = props;

    if (this.props.register) register(this.props.register, from);

    this.storeState = this.trapSelect(
      connect(
        from,
        ReactDOM.unstable_batchedUpdates
      )
    );

    if (t) this.onStateChange = throttle(t, this.onStateChange);
    else if (d) this.onStateChange = debounce(d, this.onStateChange);
  }

  componentDidMount() {
    this.props.onMount && this.props.onMount(connect(this.props.from));
  }

  componentWillUnmount() {
    this.onStateChange.cancel && this.onStateChange.cancel();
    this.unsubscribe && this.unsubscribe();
    this.props.onUnmount && this.props.onUnmount(connect(this.props.from));
  }

  setupDebug = () => {
    this.debug = State.Debug || this.props.debug;
    if (!this.debug) return;
    this.verbose = State.Verbose || this.props.verbose;

    let id = this.props.id ? "State:" + this.props.id : "State";
    if (this.props.path) id += ":" + this.props.path;

    this.log = logger(id);
  };

  onStateChange = (state, changes) => {
    if (!changes || changes.length === 0) {
      if (this.debug) this.log("`no changes`");
      return;
    }

    if (this.debug && (this.props.debounce || this.props.throttle))
      this.log("delayed changes", changes);

    this.storeState = this.trapSelect(state);
    this.forceUpdate();
  };

  stateSubscriber = (state, changes) => {
    if (this.debug) this.log("update", changes, "watch:", this.watch);

    this.onStateChange(state, changes);
  };

  trapStateQuery = (state, select) => {
    const { from, path, default: def, constant } = this.props;
    if (constant) {
      const finalState = select(getIn(state, path, def));
      if (this.debug) this.log("get", "constant");
      return finalState;
    }

    if (this.props.strict || this.watch === undefined) {
      const [finalState, watch] = watchGet(state, select, path, def, from);
      this.watch = watch;
      if (this.debug) this.log("watch", this.watch);

      this.unsubscribe = subscribe(
        this.stateSubscriber,
        this.watch,
        this.props.from
      );

      return finalState;
    }

    const finalState = select(getIn(state, path, def));
    return finalState;
  };

  trapSelect = state => {
    if (!this.props.select) return state;
    return this.trapStateQuery(state, this.props.select);
  };

  trapRender = renderFn => {
    if (this.prevStoreState === this.storeState) {
      if (this.debug && this.verbose)
        this.log("-skip render", "prevState === nextState");
      return this.prevFinalState;
    }

    if (this.props.constant && this.prevFinalState) {
      if (this.debug && this.verbose) this.log("-skip render", "constant");
      return this.prevFinalState;
    }

    const finalState = this.trapStateQuery(this.storeState, renderFn);
    if (this.debug)
      if (this.props.constant) this.log("render", "constant");
      else this.log("render");

    this.prevStoreState = this.storeState;
    this.prevFinalState = finalState;
    return finalState;
  };

  render() {
    const renderFn = this.props.children || this.props.render;
    if (!renderFn) return null;

    if (this.props.select) {
      if (this.debug)
        if (this.props.constant) this.log("render", "constant");
        else this.log("render");
      return renderFn(this.storeState);
    }
    return this.trapRender(renderFn);
  }
}

State.defaultProps = {
  path: ""
};
