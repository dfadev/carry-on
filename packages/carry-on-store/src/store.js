/** @format **/
import immer from "immer";
import { merge, isFunction, mutateSetA } from "carry-on-utils";
import notify from "./notify";

export default function makeStoreModule(defaultId, extra = () => ({})) {
  // wrap a function with middleware
  const applyMiddleware = (middlewares, fn, apply) => {
    if (!Array.isArray(middlewares)) middlewares = [middlewares];
    for (const middleware of middlewares) fn = apply(middleware, fn);
    return fn;
  };

  // middleware initialize message type
  const initMessage = "Initialize";

  const createPlugins = (store, plugins = []) => {
    if (!Array.isArray(plugins)) plugins = [plugins];

    // dispatch
    for (const plugin of plugins) {
      const { dispatch } = plugin;
      if (dispatch)
        store.d = applyMiddleware(dispatch, store.d, (middleware, fn) =>
          middleware({ ...store, dispatch: fn })
        );
    }

    // state
    const plug = {};
    for (const plugin of plugins) {
      const { state } = plugin;
      if (state) Object.assign(plug, isFunction(state) ? state(store) : state);
    }

    return merge(store.state, plug);
  };

  // a map of stores
  const stores = {};

  // create a store
  function create(id) {
    return Object.assign({ id, pending: [], notify: notify() }, extra(id));
  }

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
    if (store.dispatch) store.dispatch(() => createPlugins(store, init));
    else store.pending.push(init);
  };

  // connect a store
  const connect = ({ id, plugins, init } = {}) => {
    const store = useStore(id);
    if (store.dispatch) throw new Error("Already connected");

    // query provides a copy of state created by the producer
    store.query = (action = identity => identity, ...args) =>
      immer(store.state, action, ...args);

    // change tracking
    store.getChanges = () => store.changes;

    const patchCatcher = patches => {
      const stage1 = {};
      for (let i = 0, len = patches.length; i < len; i++)
        mutateSetA(stage1, patches[i].path, true);

      // precompute object walk so Object.keys is called the least amount necessary
      const stage2 = [];
      const queue = [];
      queue.push({ keys: Object.keys(stage1), changes: stage1, out: stage2 });

      while (queue.length > 0) {
        const item = queue.pop();

        for (let i = 0, len = item.keys.length; i < len; i++) {
          const key = item.keys[i];
          const changes = item.changes[key];
          if (changes === true) {
            item.out.push({ key, changes });
          } else {
            const nextChanges = [];
            queue.push({
              keys: Object.keys(changes),
              changes,
              out: nextChanges
            });
            item.out.push({ key, changes: nextChanges });
          }
        }
      }

      store.changes = stage2;
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
    store.state = {} = (isFunction(init) ? init(store) : init) || {};

    // populate state with plugin state
    if (plugins) {
      if (!Array.isArray(plugins)) plugins = [plugins];
    } else {
      plugins = [];
    }
    store.state = createPlugins(
      store,
      [store.notify.plugin].concat(plugins.concat(store.pending))
    );
    delete store.pending;

    // initialize middleware with state
    store.dispatch(() => store.state, initMessage);
    return store.state;
  };

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
