/** @format **/
import {
  debounce,
  isFunction,
  getIn,
  logger,
  register,
  throttle
} from "carry-on-utils";
import { connect, watchGet, subscribe } from "./store";

export class Watch {
  static Debug = false;

  static Verbose = false;

  constructor(opts) {
    this.opts = opts;
    this.setup(true);
    this.render();
  }

  // setup this component
  setup = first => {
    // setup debugging
    this.setupDebug();
    this.unsubscribe();

    const { from, throttle: t, debounce: d, register: reg } = this.opts;

    // setup the initial store state, registering state if requested
    if (first && reg) {
      let state = register(reg, from);
      if (state === undefined) state = connect(from, this.render);
      this.trapSelect(state);
    } else this.trapSelect(connect(from, this.render));

    // apply throttle or debounce
    if (t) this.onStateChange = throttle(t, this.origOnStateChange);
    else if (d) this.onStateChange = debounce(d, this.origOnStateChange);
    else this.onStateChange = this.origOnStateChange;
  };

  // unsubscribe from store updates and reset internal state
  unsubscribe = () => {
    this.watch = undefined;
    this.prevStoreState = undefined;
    this.prevFinalState = undefined;

    // cancel any pending debounced/throttled state changes
    this.onStateChange &&
      this.onStateChange.cancel &&
      this.onStateChange.cancel();

    // unsubscribe from state changes
    this.unsubscribeFromStore && this.unsubscribeFromStore();
  };

  // setup debugging
  setupDebug = () => {
    // set component debug flag
    this.debug = Watch.Debug || this.opts.debug;
    if (!this.debug) return;

    // set component verbose flag
    this.verbose = Watch.Verbose || this.opts.verbose;

    // setup log prefix and logger
    let id = this.opts.id ? "Watch:" + this.opts.id : "Watch";
    if (this.opts.path) id += ":" + this.opts.path;

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
    if (this.debug && (this.opts.debounce || this.opts.throttle))
      this.log(
        (this.opts.debounce && "debounced") || "throttled",
        "changes",
        changes
      );

    this.trapSelect(state);
    this.render();
  };

  // handle a state change notification
  stateSubscriber = (state, changes) => {
    if (this.debug) this.log("update", changes, "watch:", this.watch);

    this.onStateChange(state, changes);
  };

  // query state, potentially watching for fields accessed
  trapStateQuery = (state, select) => {
    const { from, path, default: def, constant } = this.opts;

    // handle constant
    if (constant) {
      const finalState = select(getIn(state, path, def));

      // log the constant query
      if (this.debug) this.log("get", "constant");

      return finalState;
    }

    // handle watched fields index is not yet available or strict is on
    if (this.watch === undefined || this.opts.strict) {
      // execute a query, watching the fields accessed
      const [finalState, wg] = watchGet(state, select, path, def, from);
      this.watch = wg;

      // log the newly created watch fields index
      if (this.debug) this.log("watch", this.watch);

      // subscribe to changes specified by the watch index
      this.unsubscribeFromStore = subscribe(
        this.stateSubscriber,
        this.watch,
        this.opts.from
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
    this.storeState = this.opts.select
      ? this.trapStateQuery(state, this.opts.select)
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
    if (this.opts.constant && this.prevFinalState) {
      // log a skip message because this update could probably be fixed upstream
      if (this.debug && this.verbose) this.log("-skip render", "constant");

      return this.prevFinalState;
    }

    // execute the render function, trapping fields accessed
    const finalState = this.trapStateQuery(this.storeState, renderFn);

    // log the render
    if (this.debug)
      if (this.opts.constant) this.log("render", "fn", "constant");
      else this.log("render", "fn");

    // cache the store state and the final state (result of render)
    this.prevStoreState = this.storeState;
    this.prevFinalState = finalState;
    return finalState;
  };

  render() {
    // select children or render as the render function
    const renderFn = this.opts.fn || this.opts.render;

    // no render function renders nothing
    if (!renderFn) return null;

    // handle select query
    if (this.opts.select) {
      // log a select render
      if (this.debug)
        if (this.opts.constant) this.log("render", "select", "constant");
        else this.log("render", "select");

      // update prev store state
      this.prevStoreState = this.storeState;

      // execute the render function with the selected state
      return renderFn(this.storeState);
    }

    // no select specified, trap the render function and return the result
    return this.trapRender(renderFn);
  }
}

export function watch(fn, storeId) {
  if (isFunction(fn)) {
    const ws = new Watch({
      path: "",
      fn,
      from: storeId,
      strict: true
    });
    return ws.unsubscribe;
  }
  return new Watch({ path: "", ...fn }).unsubscribe;
}
