import produce from "immer";
import {
  deproxify,
  forceArray,
  getIn,
  isFunction,
  isString,
  logger,
  mutateMerge,
  mutateSet,
  proxyState
} from "carry-on-utils";
import notify from "./notify";
import { calculateChanges } from "./changeTracking";

// middleware initialize message type
export const initMessageType = "Register";

// debug all stores flag
let Debug = false;
let log;
export function debugStores(enabled) {
  Debug = enabled;
  if (enabled && !log) log = logger("");
}

// wrap a function with middleware
const applyMiddleware = (middlewares, fn, apply) => {
  middlewares = forceArray(middlewares);
  for (let i = 0, len = middlewares.length; i < len; i += 1)
    fn = apply(middlewares[i], fn);

  return fn;
};

// merge state and middleware into the store
const createPlugins = (store, curState, plugins) => {
  const {
    id,
    get: rootGet,
    set: rootSet,
    getChanges,
    getPatches,
    isNested,
    wrap
  } = store;

  for (let i = 0, len = plugins.length; i < len; i += 1) {
    const { middleware, state, dispose, path } = plugins[i];
    const get = !path ? rootGet : (fn, opts) => rootGet(fn, { path, ...opts });
    const set = !path ? rootSet : (fn, opts) => rootSet(fn, { path, ...opts });
    if (Debug || store.debug) store.log("createPlugin", plugins[i]);

    // update middleware chain
    if (middleware) {
      const middlewares = forceArray(middleware);

      for (let j = 0, jlen = middlewares.length; j < jlen; j += 1)
        store.d = applyMiddleware(
          middlewares[j],
          store.d,
          (middlewareEntry, fn) =>
            middlewareEntry({
              id,
              get,
              set,
              next: fn,
              getChanges,
              getPatches,
              wrap,
              isNested
            })
        );
    }

    // merge state into store
    if (state) {
      store.plugState = curState;
      const states = forceArray(state);

      for (let j = 0, jlen = states.length; j < jlen; j += 1) {
        const newState = isFunction(states[j])
          ? states[j]({ id, get, set })
          : states[j];

        if (path) {
          let pathedState = getIn(curState, path);
          if (!pathedState) {
            pathedState = {};
            mutateSet(curState, path, pathedState);
          }

          mutateMerge(pathedState, newState);
        } else mutateMerge(curState, newState);
      }

      store.plugState = undefined;
    }

    // add dispose callback
    if (dispose) store.dispose.push(dispose);
  }
  return curState;
};

let realConnect;
let realGetStore;

// create a store
const create = id => ({
  id,
  dispose: [],
  pending: [],
  notify: notify(),
  log: logger(id || ""),
  get: fn => {
    realConnect(id);
    const store = realGetStore(id);
    return store.get(fn);
  },
  set: action => {
    realConnect(id);
    const store = realGetStore(id);
    return store.set(action);
  }
});

// a map of stores
let stores = {};

// delete a store
export const deleteStore = id => {
  const store = stores[id];
  if (!store) return;
  if (Debug || store.debug) store.log("delete store");

  // call all dispose callbacks
  for (let i = 0, len = store.dispose.length; i < len; i += 1)
    store.dispose[i]();

  delete stores[id];
};

// initialize the map of stores (delete all)
export const initStores = () => {
  if (Debug) log("init stores");
  // delete all existing stores
  const storeKeys = Object.keys(stores);
  for (let i = 0, len = storeKeys.length; i < len; i += 1)
    deleteStore(storeKeys[i]);

  stores = {};
};

// lookup a store
/* eslint-disable-next-line no-return-assign */
export const getStore = id => stores[id] || (stores[id] = create(id));
realGetStore = getStore;

// register state
export const register = (init, id, path) => {
  // storeId can be the first parameter
  if (isString(init)) {
    const actualId = init;
    init = id;
    id = actualId;
  }

  const store = getStore(id);
  const inits = forceArray(init).map(item => ({
    path,
    ...item
  }));

  // queue if no set available yet
  if (store.connected) {
    if (Debug || store.debug) store.log("register", inits);
    return store.set(
      state => createPlugins(store, state, inits),
      initMessageType
    );
  }

  if (Debug || store.debug) store.log("register queued", inits);
  store.pending.push(...inits);
  return undefined;
};

// connect a store --> register pending state, setup dispatch, initialize state
export const connect = (id, wrap) => {
  const store = getStore(id);
  if (store.connected) {
    // if (Debug || store.debug) store.log("reconnect", store.state);
    if (wrap) store.wrappedFn = wrap;
    return store.state;
  }

  // get provides either the current state or the trapped state
  store.get = (action, opts) => {
    let state;
    if (store.plugState) state = store.plugState;
    else if (store.trappedState) state = store.trappedState.state;
    else state = store.state;

    if (opts && opts.path) state = getIn(state, opts.path);

    const result = action ? action(state) : state;

    if (Debug || store.debug) store.log("get", deproxify(result), opts);
    return result;
  };

  // patching
  store.getPatches = () => store.patches;

  // change tracking
  store.getChanges = () => store.changes;
  const patcher = patches => {
    store.patches = patches;
    store.changes = calculateChanges(patches);
    if (Debug || store.debug)
      store.log("getChanges", "patches", patches, "changes", store.changes);
  };

  store.nestedSet = false;
  store.nestedState = undefined;
  store.isNested = () => store.nestedSet;

  // run producer action and set state
  store.d = (action, opts) => {
    const path = (opts && opts.path) || "";
    const pathedStore = {
      id,
      path,
      get: !path ? store.get : (fn, o) => store.get(fn, { path, ...o }),
      set: !path ? store.set : (fn, o) => store.set(fn, { path, ...o })
    };

    if (!store.nestedSet) {
      const rootSet = function rootSet(state) {
        store.nestedSet = true;
        store.nestedState = state;
        let pathedState = state;
        if (opts && opts.path) pathedState = getIn(state, opts.path);
        action(pathedState, pathedStore);
        store.nestedSet = false;
        store.nestedState = undefined;
        if (Debug || store.debug) store.log("set");
        return state;
      };

      try {
        const nextState = produce(store.state, rootSet, patcher);
        store.state = nextState;
        return store.state;
      } catch (e) {
        store.nestedSet = false;
        store.nestedState = undefined;
        throw e;
      }
    }

    if (Debug || store.debug) store.log("nested set", opts && opts.path);
    let pathedState = store.nestedState;
    if (opts && opts.path) pathedState = getIn(store.nestedState, opts.path);
    action(pathedState, pathedStore);

    return store.nestedState;
  };

  // store.d is mutated by middleware registration, set calls the latest
  store.set = (...args) => store.d(...args);

  // wrap change notifications to allow for external batch updates
  store.wrappedFn = wrap || (fn => fn());
  store.wrap = notifySubscribers => store.wrappedFn(notifySubscribers);

  // populate initial state
  store.state = {};
  store.pending.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  createPlugins(store, store.state, [store.notify.plugin, ...store.pending]);
  delete store.pending;

  // initialize middleware with state
  store.set(state => state, initMessageType);

  // mark store as connected
  store.connected = true;

  if (Debug || store.debug) store.log("connect", "state", store.state);

  return store.state;
};
realConnect = connect;

// subscribe to state changes
export const subscribe = (fn, watch, id) =>
  getStore(id).notify.subscribe(fn, watch);

// watch fields a select function uses
export function watchGet(state, select, path = "", def, id) {
  const store = getStore(id);

  const trappedState = proxyState(state);
  store.trappedState = trappedState;
  const pathedState = getIn(trappedState.state, path, def);
  const get = !path
    ? store.get
    : (fn, opts) => store.get(fn, { path, ...opts });
  const set = !path
    ? store.set
    : (fn, opts) => store.set(fn, { path, ...opts });

  const selectedState = select(pathedState, { get, set, id, path });
  trappedState.seal();
  store.trappedState = undefined;
  const watch = trappedState.affected;
  const deproxified = deproxify(selectedState);
  const finalState = deproxified !== undefined ? deproxified : selectedState;

  if (Debug || store.debug) store.log("watchGet", "watch", watch);
  return [finalState, watch];
}

export function debugStore(id, val = true) {
  if (arguments.length === 1) getStore().debug = id;
  else getStore(id).debug = val;
}
