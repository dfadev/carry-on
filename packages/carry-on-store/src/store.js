/** @format **/
import produce from "immer";
import {
  proxyState,
  deproxify,
  forceArray,
  mutateMerge,
  isFunction,
  getIn
} from "carry-on-utils";
import notify from "./notify";
import { calculateChanges } from "./changeTracking";

// middleware initialize message type
export const initMessageType = "Register";

// wrap a function with middleware
const applyMiddleware = (middlewares, fn, apply) => {
  middlewares = forceArray(middlewares);
  for (let i = 0, len = middlewares.length; i < len; i++)
    fn = apply(middlewares[i], fn);

  return fn;
};

// merge state and middleware into the store
const createPlugins = (store, curState, plugins) => {
  const { id, get, set, getChanges, isNested, wrap } = store;

  for (let i = 0, len = plugins.length; i < len; i++) {
    const { middleware, state, dispose } = plugins[i];

    // update middleware chain
    if (middleware) {
      const middlewares = forceArray(middleware);

      for (let j = 0, jlen = middlewares.length; j < jlen; j++)
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
              wrap,
              isNested
            })
        );
    }

    // merge state into store
    if (state) {
      store.plugState = curState;
      const states = forceArray(state);

      for (let j = 0, jlen = states.length; j < jlen; j++)
        mutateMerge(
          curState,
          isFunction(states[j]) ? states[j]({ id, get, set }) : states[j]
        );

      store.plugState = undefined;
    }

    // add dispose callback
    if (dispose) store.dispose.push(dispose);
  }
  return curState;
};

// create a store
const create = id => ({ id, dispose: [], pending: [], notify: notify() });

// a map of stores
let stores = {};

// delete a store
export const deleteStore = id => {
  const store = stores[id];
  if (!store) return;

  // call all dispose callbacks
  for (let i = 0, len = store.dispose.length; i < len; i++) store.dispose[i]();

  delete stores[id];
};

// initialize the map of stores (delete all)
export const initStores = () => {
  // delete all existing stores
  const storeKeys = Object.keys(stores);
  for (let i = 0, len = storeKeys.length; i < len; i++)
    deleteStore(storeKeys[i]);

  stores = {};
};

// lookup a store
export const useStore = id => stores[id] || (stores[id] = create(id));

// register state
export const register = (init, id) => {
  const store = useStore(id);
  init = forceArray(init);
  // queue if no set available yet
  if (store.set)
    return store.set(
      state => createPlugins(store, state, init),
      initMessageType
    );

  store.pending.push(...init);
  return undefined;
};

// connect a store --> register pending state, setup dispatch, initialize state
export const connect = (id, wrap) => {
  const store = useStore(id);
  if (store.set) return store.state;

  // get provides either the current state or the trapped state
  store.get = action => {
    let state;
    if (store.plugState) state = store.plugState;
    else if (store.trappedState) state = store.trappedState.state;
    else state = store.state;

    return action ? action(state) : state;
  };

  // change tracking
  store.getChanges = () => store.changes;
  const patcher = patches => (store.changes = calculateChanges(patches));

  store.nestedSet = false;
  store.nestedState = undefined;
  store.isNested = () => store.nestedSet;

  // run producer action and set state
  store.d = action => {
    if (!store.nestedSet) {
      const rootSet = function rootSet(state) {
        store.nestedSet = true;
        store.nestedState = state;
        action(state);
        store.nestedSet = false;
        store.nestedState = undefined;
        return state;
      };

      return (store.state = produce(store.state, rootSet, patcher));
    }

    action(store.nestedState);
    return store.nestedState;
  };

  // store.d is mutated by middleware registration, set calls the latest
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
export const subscribe = (fn, watch, id) =>
  useStore(id).notify.subscribe(fn, watch);

// watch fields a select function uses
export function watchGet(state, select, path, def, id) {
  const store = useStore(id);

  const trappedState = proxyState(state);
  store.trappedState = trappedState;
  const pathedState = getIn(trappedState.state, path, def);
  const selectedState = select(pathedState);
  trappedState.seal();
  store.trappedState = undefined;
  const watch = trappedState.affected;
  const deproxified = deproxify(selectedState);
  const finalState = deproxified !== undefined ? deproxified : selectedState;

  return [finalState, watch];
}
