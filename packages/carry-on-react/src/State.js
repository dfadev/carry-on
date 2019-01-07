/** @format **/
import { Component } from "react";
import {
  shallowEqual,
  logger,
  throttle,
  debounce,
  getIn
} from "carry-on-utils";
import { register, connect, subscribe, watchGet } from "carry-on-store";
import ReactDOM from "react-dom";

const ignoreProps = ["children"];

export default class State extends Component {
  static Debug = false;

  static Verbose = false;

  constructor(props) {
    super(props);
    this.setup(true);
  }

  // setup this component
  setup = first => {
    // setup debugging
    this.setupDebug();
    this.reset();

    const { from, throttle: t, debounce: d, register: reg } = this.props;

    // setup the initial store state, registering state if requested
    if (first && reg) {
      let state = register(reg, from);
      if (state === undefined)
        state = connect(
          from,
          ReactDOM.unstable_batchedUpdates
        );
      this.trapSelect(state);
    } else
      this.trapSelect(
        connect(
          from,
          ReactDOM.unstable_batchedUpdates
        )
      );

    // apply throttle or debounce
    if (t) this.onStateChange = throttle(t, this.origOnStateChange);
    else if (d) this.onStateChange = debounce(d, this.origOnStateChange);
    else this.onStateChange = this.origOnStateChange;
  };

  // reset internal state
  reset = () => {
    this.watch = undefined;
    this.prevStoreState = undefined;
    this.prevFinalState = undefined;

    // cancel any pending debounced/throttled state changes
    this.onStateChange &&
      this.onStateChange.cancel &&
      this.onStateChange.cancel();

    // unsubscribe from state changes
    this.unsubscribe && this.unsubscribe();
  };

  componentDidMount() {
    // call onMount handler
    if (!this.props.onMount) return;
    const state = connect(this.props.from);
    if (this.props.onMount.length === 2) this.props.onMount(this.props, state);
    else this.props.onMount(state);
  }

  componentWillUnmount() {
    this.reset();

    // call onUnmount handler
    if (!this.props.onUnmount) return;
    const state = connect(this.props.from);
    if (this.props.onUnmount.length === 2)
      this.props.onUnmount(this.props, state);
    else this.props.onUnmount(state);
  }

  shouldComponentUpdate(nextProps) {
    const storeState = this.prevStoreState === this.storeState;
    if (!storeState) {
      if (this.debug) this.log("shouldComponentUpdate", "store state change");
      return true;
    }

    // ignore children changes -- if you need a reset use render property
    // instead of children
    const shallowEq = shallowEqual(this.props, nextProps, ignoreProps);
    if (!shallowEq) {
      if (this.debug) this.log("shouldComponentUpdate", "props change");
      this.setup();
      return true;
    }

    if (this.debug && this.verbose)
      this.log("-shouldComponentUpdate", "skip render");

    return false;
  }

  // setup debugging
  setupDebug = () => {
    // set component debug flag
    this.debug = State.Debug || this.props.debug;
    if (!this.debug) return;

    // set component verbose flag
    this.verbose = State.Verbose || this.props.verbose;

    // setup log prefix and logger
    let id = this.props.id ? "State:" + this.props.id : "State";
    if (this.props.path) id += ":" + this.props.path;

    // create logger function
    this.log = logger(id);
  };

  // process a state change
  origOnStateChange = (state, changes) => {
    if (!changes || changes.length === 0) {
      if (this.debug) this.log("`no changes`");
      return;
    }

    // log if these changes have been delayed via debounce or throttle
    if (this.debug && (this.props.debounce || this.props.throttle))
      this.log("delayed changes", changes);

    this.trapSelect(state);
    this.forceUpdate();
  };

  // handle a state change notification
  stateSubscriber = (state, changes) => {
    if (this.debug) this.log("update", changes, "watch:", this.watch);

    this.onStateChange(state, changes);
  };

  // query state, potentially watching for fields accessed
  trapStateQuery = (state, select) => {
    const { from, path, default: def, constant } = this.props;

    // handle constant
    if (constant) {
      const finalState = select(getIn(state, path, def));

      // log the constant query
      if (this.debug) this.log("get", "constant");

      return finalState;
    }

    // handle watched fields index is not yet available or strict is on
    if (this.watch === undefined || this.props.strict) {
      // execute a query, watching the fields accessed
      const [finalState, watch] = watchGet(state, select, path, def, from);
      this.watch = watch;

      // log the newly created watch fields index
      if (this.debug) this.log("watch", this.watch);

      // subscribe to changes specified by the watch index
      this.unsubscribe = subscribe(
        this.stateSubscriber,
        this.watch,
        this.props.from
      );

      return finalState;
    }

    // just execute the query, no need to track fields accessed because:
    // - not a constant,
    // - not a strict,
    // - has watched field index
    const finalState = select(getIn(state, path, def));
    return finalState;
  };

  // trap a select query, tracking fields accessed
  trapSelect = state => {
    // return original state when there's no select because fields are tracked
    // in the render function
    this.storeState = this.props.select
      ? this.trapStateQuery(state, this.props.select)
      : state;
  };

  // trap a render function, tracking fields accessed
  trapRender = renderFn => {
    // strict equality means we have rendered for this state already
    if (this.prevStoreState === this.storeState) {
      // log a skip message because this update could probably be fixed upstream
      if (this.debug && this.verbose)
        this.log("-skip render", "prevState === nextState");

      return this.prevFinalState;
    }

    // constants only execute render function once
    if (this.props.constant && this.prevFinalState) {
      // log a skip message because this update could probably be fixed upstream
      if (this.debug && this.verbose) this.log("-skip render", "constant");

      return this.prevFinalState;
    }

    // execute the render function, trapping fields accessed
    const finalState = this.trapStateQuery(this.storeState, renderFn);

    // log the render
    if (this.debug)
      if (this.props.constant) this.log("render", "constant");
      else this.log("render");

    // cache the store state and the final state (result of render)
    this.prevStoreState = this.storeState;
    this.prevFinalState = finalState;
    return finalState;
  };

  render() {
    // select children or render as the render function
    const renderFn = this.props.children || this.props.render;

    // no render function renders nothing
    if (!renderFn) return null;

    // handle select query
    if (this.props.select) {
      // log a select render
      if (this.debug)
        if (this.props.constant) this.log("render", "constant");
        else this.log("render");

      // update prev store state
      this.prevStoreState = this.storeState;

      // execute the render function with the selected state
      return renderFn(this.storeState);
    }

    // no select specified, trap the render function and return the result
    return this.trapRender(renderFn);
  }
}

State.defaultProps = {
  path: ""
};
