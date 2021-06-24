import { debounce, getIn, logger, throttle } from "carry-on-utils";
import { connect, watchGet, register, subscribe } from "./store";
import set from "./set";

export class Watch {
  static Debug = false;

  static Verbose = false;

  constructor(opts) {
    this.opts = opts;
    this.setup();
    this.render();
  }

  // setup this component
  setup = () => {
    // setup debugging
    this.setupDebug();
    this.unsubscribe();

    const { from, throttle: t, debounce: d, register: reg } = this.opts;

    // setup the initial store state, registering state if requested
    if (reg) {
      if (this.debug) this.log("setup", "registering state", reg);
      let state = register(reg, from);
      if (state === undefined) state = connect(from);
      this.storeState = state;
    } else this.storeState = connect(from);

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
    if (this.onStateChange && this.onStateChange.cancel)
      this.onStateChange.cancel();

    // unsubscribe from state changes
    if (this.unsubscribeFromStore) this.unsubscribeFromStore();
  };

  // setup debugging
  setupDebug = () => {
    // set component debug flag
    this.debug = this.opts.debug !== undefined ? this.opts.debug : Watch.Debug;
    if (!this.debug) return;

    // set component verbose flag
    this.verbose =
      this.opts.verbose !== undefined ? this.opts.verbose : Watch.Verbose;

    // setup log prefix and logger
    let id = this.opts.id ? `Watch:${this.opts.id}` : "Watch";
    if (this.opts.path) id += `:${this.opts.path}`;

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

    this.storeState = state;
    this.render();
  };

  // handle a state change notification
  stateSubscriber = (state, changes) => {
    if (this.debug) this.log("update", changes, "watch:", this.watch);

    this.onStateChange(state, changes);
  };

  // query state, potentially watching for fields accessed
  trapStateQuery = (state, select) => {
    const { from, path, default: def } = this.opts;

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
    return select(getIn(state, path, def));
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

    // execute the render function, trapping fields accessed
    const finalState = this.trapStateQuery(this.storeState, renderFn);

    // log the render
    if (this.debug) this.log("render", "if");

    // cache the store state and the final state (result of render)
    this.prevStoreState = this.storeState;
    this.prevFinalState = finalState;
    return finalState;
  };

  render() {
    // select children or render as the render function
    const renderFn = this && this.opts && this.opts.if;

    // no render function does nothing
    if (!renderFn) return;

    try {
      const result = this.trapRender(renderFn);
      if (result && this.opts.then) set(this.opts.then, this.opts.from);
      else if (this.opts.else) set(this.opts.else, this.opts.from);
    } catch (e) {
      if (this.opts.error)
        set(state => this.opts.error(state, e, this.opts.from));
    }
  }
}

const defaultWatchOptions = {
  path: "",
  strict: true
};

export function watch(opts) {
  return new Watch({ ...defaultWatchOptions, ...opts }).unsubscribe;
}
