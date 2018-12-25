/** @format **/
import produce, { nothing } from "immer";
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
  const { id, get, set, getChanges, wrap } = store;
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
            middlewareEntry({ id, get, set: fn, getChanges, wrap })
        );
    }

    if (state) {
      const states = Array.isArray(state) ? state : [state];
      for (let j = 0, jlen = states.length; j < jlen; j++)
        mutateMerge(
          curState,
          isFunction(states[j]) ? states[j]({ id, get, set }) : states[j]
        );
    }
  }
  return curState;
};

// create a store
const create = id => ({ id, pending: [], notify: notify() });

// a map of stores
let stores = {};

// initialize the map of stores (delete all)
export const initStores = () => (stores = {});

// delete a store
export const deleteStore = id => delete stores[id];

// lookup a store
export const useStore = id => stores[id] || (stores[id] = create(id));

// register state
export const register = (init, id) => {
  const store = useStore(id);
  // queue if no set available yet
  if (store.set)
    store.set(state => createPlugins(store, state, init), initMessageType);
  else store.pending.push(init);
};

// connect a store
export const connect = (id, wrap) => {
  const store = useStore(id);
  if (store.set) return store.state;

  const runAction = action => state => {
    const rslt = action(state);
    if (rslt === undefined) return nothing;
  };

  // get provides a copy of state created by the producer
  store.get = (action = identity => identity, ...args) =>
    produce(store.state, runAction(action), ...args);

  // change tracking
  store.getChanges = () => store.changes;

  const patcher = patches => (store.changes = calculateChanges(patches));

  // run producer action and set state
  store.d = action => (store.state = produce(store.state, action, patcher));

  // store.d mutates according to middleware, set calls the latest
  store.set = (...args) => store.d(...args);

  // wrap change notifications to allow for external batch updates
  store.wrap = wrap;

  // populate initial state
  store.state = {};
  store.pending.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  createPlugins(store, store.state, [store.notify.plugin, ...store.pending]);
  delete store.pending;

  // initialize middleware with state
  store.set(state => state, initMessageType);
  return store.state;
};

// subscribe to state changes
export const subscribe = (id, fn) => useStore(id).notify.subscribe(fn);
