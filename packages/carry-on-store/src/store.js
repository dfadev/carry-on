/** @format **/
import immer from "immer";
import { mutateMerge, isFunction } from "carry-on-utils";
import notify from "./notify";
import { calculateChanges } from "./changeTracking";

// middleware initialize message type
export const initMessageType = "Initialize";

// wrap a function with middleware
const applyMiddleware = (middlewares, fn, apply) => {
  if (!Array.isArray(middlewares)) middlewares = [middlewares];
  for (const middleware of middlewares) fn = apply(middleware, fn);
  return fn;
};

const createPlugins = (store, curState, plugins = []) => {
  const { id, query, getChanges } = store;
  if (!Array.isArray(plugins)) plugins = [plugins];

  for (let i = 0, len = plugins.length; i < len; i++) {
    const plugin = plugins[i];
    const { middleware, state } = plugin;
    if (middleware) {
      const middlewares = Array.isArray(middleware) ? middleware : [middleware];
      for (let j = 0, jlen = middlewares.length; j < jlen; j++)
        store.d = applyMiddleware(
          middlewares[j],
          store.d,
          (middlewareEntry, fn) =>
            middlewareEntry({ query, id, dispatch: fn, getChanges })
        );
    }

    if (state) {
      const states = Array.isArray(state) ? state : [state];
      for (let j = 0, jlen = states.length; j < jlen; j++)
        mutateMerge(
          curState,
          isFunction(states[j]) ? states[j](store) : states[j]
        );
    }
  }
  return curState;
};

// create a store
const create = id => ({ id, pending: [], notify: notify() });

// a map of stores
let stores = {};

// initialize the map of stores
export const initStores = () => (stores = {});

// delete a store
export const deleteStore = id => delete stores[id];

// lookup a store
export const useStore = id => stores[id] || (stores[id] = create(id));

// register state
export const register = (init, id) => {
  const store = useStore(id);
  // queue if no dispatch available yet
  if (store.dispatch)
    store.dispatch(state => createPlugins(store, state, init));
  else store.pending.push(init);
};

// connect a store
export const connect = id => {
  const store = useStore(id);
  if (store.dispatch) return store.state;

  // query provides a copy of state created by the producer
  store.query = (action = identity => identity, ...args) =>
    immer(store.state, action, ...args);

  // change tracking
  store.getChanges = () => store.changes;

  const patchCatcher = patches => (store.changes = calculateChanges(patches));

  // run producer action and set state
  store.d = function core(action, type, force) {
    return (store.state = force
      ? action(store.state)
      : immer(store.state, action, patchCatcher));
  };

  // store.d mutates according to middleware, dispatch calls the latest
  store.dispatch = (...args) => store.d(...args);

  // populate initial state
  store.state = {};
  store.pending.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  createPlugins(store, store.state, [store.notify.plugin, ...store.pending]);
  delete store.pending;

  // initialize middleware with state
  store.dispatch(state => state, initMessageType);
  return store.state;
};

// subscribe to state changes
export const subscribe = (id, fn) => useStore(id).notify.subscribe(fn);
