import { Component } from "react";
import {
  debounce,
  getIn,
  logger,
  shallowEqual,
  throttle
} from "carry-on-utils";
import {
  getStore,
  register,
  connect,
  subscribe,
  watchGet
} from "carry-on-store";
import ReactDOM from "react-dom";
import StoreContext from "./StoreContext";
import withNodesToProps from "./withNodesToProps";
import withStore from "./withStore";

const ignoreProps = ["children"];

class State extends Component {
  static Debug = false;

  static Verbose = false;

  constructor(props) {
    super(props);
    this.setup(true);
  }

  componentDidMount() {
    // call onMount handler
    const { onMount, from, path, default: def } = this.props;

    if (!onMount) return;

    let state = connect(from);
    if (path) state = getIn(state, path, def);

    if (onMount.length === 2) onMount(this.props, state);
    else onMount(state);
  }

  shouldComponentUpdate(nextProps) {
    if (this.prevStoreState !== this.storeState) {
      if (this.debug) this.log("shouldComponentUpdate", "store state change");
      return true;
    }

    // ignore children changes -- if you need a reset use render property
    // instead of children
    if (!shallowEqual(this.props, nextProps, ignoreProps)) {
      if (this.debug) this.log("shouldComponentUpdate", "props change");
      this.setup();
      return true;
    }

    if (this.debug && this.verbose)
      this.log("-shouldComponentUpdate", "skip render");

    return false;
  }

  componentWillUnmount() {
    this.reset();

    // call onUnmount handler
    const { onUnmount, from, path, default: def } = this.props;

    if (!onUnmount) return;

    let state = connect(from);
    if (path) state = getIn(state, path, def);

    if (onUnmount.length === 2) onUnmount(this.props, state);
    else onUnmount(state);
  }

  // setup this component
  setup = first => {
    // setup debugging
    this.setupDebug();
    this.reset();

    const { from, throttle: t, debounce: d, register: reg, path } = this.props;

    // setup the initial store state, registering state if requested
    if (first && reg) {
      if (this.debug) this.log("setup", "registering state", reg, path);
      let state = register(reg, from, path);
      if (state === undefined)
        state = connect(from, ReactDOM.unstable_batchedUpdates);
      this.trapSelect(state);
    } else this.trapSelect(connect(from, ReactDOM.unstable_batchedUpdates));

    // apply throttle or debounce
    if (t) this.onStateChange = throttle(t, this.origOnStateChange);
    else if (d) this.onStateChange = debounce(d, this.origOnStateChange);
    else this.onStateChange = this.origOnStateChange;
  };

  // setup debugging
  setupDebug = () => {
    // set component debug flag
    const { debug, verbose, id, path, from } = this.props;

    this.debug = State.Debug || debug;
    if (!this.debug) return;

    // set component verbose flag
    this.verbose = State.Verbose || verbose;

    // setup log prefix and logger
    let loggerId = id ? `State:${id}` : "State";
    if (path) loggerId += `:${path}`;
    if (from) loggerId = `${from}.${loggerId}`;

    // create logger function
    this.log = logger(loggerId);
  };

  // reset internal state
  reset = () => {
    this.watch = undefined;
    this.prevStoreState = undefined;
    this.prevFinalState = undefined;

    // cancel any pending debounced/throttled state changes
    if (this.onStateChange && this.onStateChange.cancel)
      this.onStateChange.cancel();

    // unsubscribe from state changes
    if (this.unsubscribe) this.unsubscribe();
  };

  // process a state change
  origOnStateChange = (state, changes) => {
    if (!changes || changes.length === 0) {
      if (this.debug) this.log("`no changes`");
      return;
    }

    // log if these changes have been delayed via debounce or throttle
    const { debounce: d, throttle: t } = this.props;

    if (this.debug && (d || t))
      this.log((d && "debounced") || "throttled", "changes", changes);

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
    const { from, path, default: def, constant, strict } = this.props;

    // handle constant
    if (constant) {
      const finalState = select(getIn(state, path, def));

      // log the constant query
      if (this.debug) this.log("get", "constant");

      return finalState;
    }

    // handle watched fields index is not yet available or strict is on
    if (this.watch === undefined || strict) {
      // execute a query, watching the fields accessed
      const [finalState, watch] = watchGet(state, select, path, def, from);
      this.watch = watch;

      // log the newly created watch fields index
      if (this.debug) this.log("watch", this.watch);

      // subscribe to changes specified by the watch index
      this.unsubscribe = subscribe(this.stateSubscriber, this.watch, from);

      return finalState;
    }

    // just execute the query, no need to track fields accessed because:
    // - not a constant,
    // - not a strict,
    // - has watched field index
    const pathedState = getIn(state, path, def);
    const store = getStore(from);
    const get = !path
      ? store.get
      : (fn, opts) => store.get(fn, { path, ...opts });
    const set = !path
      ? store.set
      : (fn, opts) => store.set(fn, { path, ...opts });

    const pathedStore = { get, set, id: from, path };

    return select(pathedState, pathedStore);
  };

  // trap a select query, tracking fields accessed
  trapSelect = state => {
    // return original state when there's no select because fields are tracked
    // in the render function
    const { select } = this.props;
    this.storeState = select ? this.trapStateQuery(state, select) : state;
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
    const { constant } = this.props;

    if (constant && this.prevFinalState) {
      // log a skip message because this update could probably be fixed upstream
      if (this.debug && this.verbose) this.log("-skip render", "constant");

      return this.prevFinalState;
    }

    // execute the render function, trapping fields accessed
    const finalState = this.trapStateQuery(this.storeState, renderFn);

    // log the render
    if (this.debug)
      if (constant) this.log("render", "fn", "constant");
      else this.log("render", "fn");

    // cache the store state and the final state (result of render)
    this.prevStoreState = this.storeState;
    this.prevFinalState = finalState;
    return finalState;
  };

  render() {
    const { children, render, select, constant } = this.props;

    // select children or render as the render function
    const renderFn = children || render;

    // handle select query
    if (select) {
      // log a select render
      if (this.debug)
        if (constant) this.log("render", "select", "constant");
        else this.log("render", "select");

      // update prev store state
      this.prevStoreState = this.storeState;

      // no render function renders select result
      if (!renderFn) return this.storeState;

      // execute the render function with the selected state
      return renderFn(this.storeState);
    }

    // no render function renders nothing
    if (!renderFn || typeof renderFn !== "function") return null;

    // no select specified, trap the render function and return the result
    return this.trapRender(renderFn);
  }
}

State.contextType = StoreContext;
State.composes = [
  "register",
  "render",
  "onMount",
  "onUnmount",
  "select",
  "path",
  "default",
  "throttle",
  "constant",
  "strict",
  "debounce",
  "debug",
  "verbose",
  "id"
];

State.defaultProps = {
  path: "",
  from: undefined,
  select: undefined,
  constant: false,
  strict: false,
  default: undefined,
  throttle: undefined,
  debounce: undefined,
  debug: false,
  verbose: false,
  id: undefined,
  onMount: undefined,
  onUnmount: undefined,
  render: undefined
};

const ComposableState = withStore(withNodesToProps(State));
export default ComposableState;
