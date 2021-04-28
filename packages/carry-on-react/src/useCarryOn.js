import { useState, useEffect, useMemo } from "react";
import {
  register,
  connect,
  subscribe,
  watchGet,
  getStore
} from "carry-on-store";
import { logger, throttle, debounce, getIn } from "carry-on-utils";
import ReactDOM from "react-dom";

const useCarryOn = (opts, optional = {}) => {
  opts = typeof opts === "function" ? { select: opts, ...optional } : opts;

  const {
    from,
    path,
    select,
    default: def,
    constant,
    throttle: t,
    debounce: d,
    register: reg,
    debug = useCarryOn.Debug,
    verbose = useCarryOn.Verbose,
    id,
    strict
  } = opts || {};

  const store = getStore(from);
  const [storeState, setStoreState] = useState();
  const [watch, setWatch] = useState();
  const [unsubscribe, setUnsubscribe] = useState();

  // setup debugging
  const log = useMemo(() => {
    // setup log prefix and logger
    let prefix = id ? "useCarryOn:" + id : "useCarryOn";
    if (path) prefix += ":" + path;

    // create logger function
    return logger(prefix);
  }, [id, path]);

  let trapSelect;

  const onStateChange = useMemo(() => {
    const fn = (state, changes) => {
      if (!changes || changes.length === 0) {
        if (debug) log("`no changes`");
        return;
      }

      // log if these changes have been delayed via debounce or throttle
      if (debug && (d || t)) log("delayed changes", changes);

      if (debug) log("onStateChange");
      trapSelect(state);
    };

    // apply throttle or debounce
    let r = fn;
    if (t) r = throttle(t, fn);
    else if (d) r = debounce(d, fn);
    return r;
  }, [debug, d, t]);

  useEffect(
    () => () => {
      if (debug) log("reset");
      setWatch(undefined);

      // cancel any pending debounced/throttled state changes
      onStateChange && onStateChange.cancel && onStateChange.cancel();

      // unsubscribe from state changes
      unsubscribe && unsubscribe();
    },
    []
  );

  const stateSubscriber = useMemo(
    () => (state, changes) => {
      if (debug) log("update", changes, "watch:", watch, "state:", state);

      onStateChange && onStateChange(state, changes);
    },
    [debug, log, watch, onStateChange]
  );

  trapSelect = useMemo(
    () => state => {
      if (debug && verbose) log("trapSelect");
      let finalState;

      if (!select) finalState = state;
      // handle constant
      else if (constant) {
        finalState = select(getIn(state, path, def));

        // log the constant query
        if (debug) log("get", "constant");
      }
      // handle watched fields index is not yet available or strict is on
      else if (watch === undefined || strict) {
        // execute a query, watching the fields accessed
        const [watchState, watches] = watchGet(state, select, path, def, from);
        setWatch(watches);

        // log the newly created watch fields index
        if (debug) log("watch", watches);

        // subscribe to changes specified by the watch index
        //setUnsubscribe(subscribe(stateSubscriber, watches, from));

        const unsub = subscribe(stateSubscriber, watches, from);
        setUnsubscribe(() => unsub);

        finalState = watchState;
      } else {
        // just execute the query, no need to track fields accessed because:
        // - not a constant,
        // - not a strict,
        // - has watched field index
        finalState = select(getIn(state, path, def));
      }

      if (storeState !== finalState) setStoreState(finalState);
      return finalState;
    },
    [from, path, def, constant, watch]
  );

  // setup the initial store state, registering state if requested
  const initialState = useMemo(() => {
    if (debug && verbose) log("setup");

    if (reg) {
      let state = register(reg, from);
      if (state === undefined)
        state = connect(from, ReactDOM.unstable_batchedUpdates);
      return trapSelect(state);
    }
    return trapSelect(connect(from, ReactDOM.unstable_batchedUpdates));
  }, [from]);

  return [storeState === undefined ? initialState : storeState, store.set];
};

useCarryOn.Debug = false;
useCarryOn.Verbose = false;

export default useCarryOn;
