/** @format **/
import immer from "immer";
import { mutateMerge, isFunction } from "carry-on-utils";
import notify from "./notify";
import { calculateChangesIndex } from "./changeTracking";

// middleware initialize message type
const initMessage = "Initialize";

// wrap a function with middleware
const applyMiddleware = (middlewares, fn, apply) => {
  if (!Array.isArray(middlewares)) middlewares = [middlewares];
  for (const middleware of middlewares) fn = apply(middleware, fn);
  return fn;
};

const createPlugins = (store, curState, plugins = []) => {
  if (!Array.isArray(plugins)) plugins = [plugins];

  // dispatch
  for (let i = 0, len = plugins.length; i < len; i++) {
    const plugin = plugins[i];
    const { middleware, state } = plugin;
    if (middleware) {
      const middlewares = Array.isArray(middleware) ? middleware : [middleware];
      for (let j = 0, jlen = middlewares.length; j < jlen; j++)
        store.d = applyMiddleware(
          middlewares[j],
          store.d,
          (middlewareEntry, fn) => middlewareEntry({ ...store, dispatch: fn })
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
function create(id) {
  return { id, pending: [], notify: notify() };
}

export default function makeStoreModule(defaultId) {
  // a map of stores
  const stores = {};

  // delete a store
  function deleteStore(id = defaultId) {
    delete stores[id];
  }

  // lookup a store
  const useStore = (id = defaultId) => stores[id] || (stores[id] = create(id));

  // register state
  const register = (init, id = defaultId) => {
    const store = useStore(id);
    // queue if no dispatch available yet
    if (store.dispatch)
      store.dispatch(state => createPlugins(store, state, init));
    else store.pending.push(init);
  };

  // connect a store
  const connect = id => {
    const store = useStore(id);
    if (store.dispatch) return store.state;

    // query provides a copy of state created by the producer
    store.query = (action = identity => identity, ...args) =>
      immer(store.state, action, ...args);

    // change tracking
    store.getChanges = () => store.changes;

    const patchCatcher = patches => {
      store.changes = calculateChangesIndex(patches);
    };

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
    const plugins = [store.notify.plugin, ...store.pending];
    createPlugins(store, store.state, plugins);
    delete store.pending;

    // initialize middleware with state
    store.dispatch(state => state, initMessage);
    return store.state;
  };

  // subscribe to state changes
  const subscribe = (id = defaultId, fn) => useStore(id).notify.subscribe(fn);

  return {
    subscribe,
    useStore,
    deleteStore,
    connect,
    defaultId,
    register
  };
}
