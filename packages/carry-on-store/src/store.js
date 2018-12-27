/** @format **/
import produce, { nothing } from "immer";
import { forceArray, mutateMerge, isFunction } from "carry-on-utils";
import notify from "./notify";
import { calculateChanges } from "./changeTracking";

// middleware initialize message type
export const initMessageType = "Initialize";

// wrap a function with middleware
const applyMiddleware = (middlewares, fn, apply) => {
  middlewares = forceArray(middlewares);
  for (let i = 0, len = middlewares.length; i < len; i++)
    fn = apply(middlewares[i], fn);

  return fn;
};

// merge state and middleware into the store
const createPlugins = (store, curState, plugins) => {
  const { id, get, set, getChanges, wrap } = store;

  for (let i = 0, len = plugins.length; i < len; i++) {
    const { middleware, state } = plugins[i];

    if (middleware) {
      const middlewares = forceArray(middleware);
      for (let j = 0, jlen = middlewares.length; j < jlen; j++)
        store.d = applyMiddleware(
          middlewares[j],
          store.d,
          (middlewareEntry, fn) =>
            middlewareEntry({ id, get, set: fn, getChanges, wrap })
        );
    }

    if (state) {
      const states = forceArray(state);
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
  init = forceArray(init);
  // queue if no set available yet
  if (store.set)
    store.set(state => createPlugins(store, state, init), initMessageType);
  else store.pending.push(...init);
};

// connect a store
export const connect = (id, wrap) => {
  const store = useStore(id);
  if (store.set) return store.state;

  const runGetAction = action => state => {
    const rslt = action(state);
    return rslt === undefined ? nothing : rslt;
  };

  // get provides a copy of state created by the producer
  store.get = (action = identity => identity, ...args) =>
    produce(store.state, runGetAction(action), ...args);

  // change tracking
  store.getChanges = () => store.changes;
  const patcher = patches => (store.changes = calculateChanges(patches));

  store.nestedSet = false;
  store.nestedState = undefined;

  // run producer action and set state
  store.d = action => {
    const runRootSet = state => {
      store.nestedSet = true;
      store.nestedState = state;
      const rslt = action(state);
      store.nestedSet = false;
      store.nestedState = undefined;
      return rslt;
    };

    return (store.state = produce(store.state, runRootSet, patcher));
  };

  // store.d is mutated by middleware registration, set calls the latest
  store.set = (action, ...args) =>
    store.nestedSet ? action(store.nestedState) : store.d(action, ...args);

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
export const subscribe = (id, fn, watch) =>
  useStore(id).notify.subscribe(fn, watch);
