/** @format **/
export default function makeStoreModule(defaultId, extra = () => ({})) {
  const isFunction = thing =>
    !!(thing && thing.constructor && thing.call && thing.apply);

  // wrap a function with middleware
  const applyMiddleware = (middlewares, fn, apply) => {
    if (!Array.isArray(middlewares)) middlewares = [middlewares];
    for (const middleware of middlewares) fn = apply(middleware, fn);
    return (...args) => fn(...args);
  };

  // middleware initialize message type
  const initMessage = "Initialize";

  const createPlugins = (store, plugins = []) => {
    if (!Array.isArray(plugins)) plugins = [plugins];

    // dispatch
    for (const plugin of plugins) {
      const { dispatch } = plugin;
      if (dispatch)
        store.d = applyMiddleware(dispatch, store.d, (middleware, fn) => {
          store.dispatch = fn;
          return middleware(store);
        });
    }

    store.dispatch = store.d;

    // state
    for (const plugin of plugins) {
      const { state } = plugin;
      if (state)
        Object.assign(store.state, isFunction(state) ? state(store) : state);
    }

    return store.state;
  };

  // a map of stores
  const stores = {};

  // create a store
  function create(id) {
    return Object.assign({ id, pending: [], listeners: [] }, extra(id));
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
    if (store.dispatch)
      store.dispatch(() => {
        store.state = { ...store.state };
        return createPlugins(store, init);
      });
    else store.pending.push(init);
  };

  // connect a store (should rename this?)
  const connect = ({ id, producer, publish, plugins, init } = {}) => {
    const store = useStore(id);
    if (store.dispatch) throw new Error("Already connected");

    // the producer creates new states from old states by executing actions
    store.producer = producer || ((state, action) => action(state));

    // query provides a copy of state created by the producer
    store.query = (action = identity => identity, ...args) =>
      store.producer(store.state, action, ...args);

    // run producer action and set state
    store.d = (action, type, force) => {
      const nextState = (store.state = force
        ? action(store.state)
        : store.producer(store.state, action));
      store.listeners.map(listener => listener && listener(nextState));
      if (publish && type !== initMessage) {
        publish(nextState);
      }
      return nextState;
    };

    // populate initial state
    store.state = (isFunction(init) ? init(store) : init) || {};

    // populate state with plugin state
    if (plugins) {
      if (!Array.isArray(plugins)) plugins = [plugins];
    } else {
      plugins = [];
    }
    createPlugins(store, plugins.concat(store.pending));
    delete store.pending;

    // initialize middleware with state
    store.dispatch(() => store.state, initMessage);
    return store.state;
  };

  const subscribe = (id, fn) => {
    const store = useStore(id);
    const idx = store.listeners.push(fn);
    return () => store.listeners.splice(idx - 1, 1);
  };

  return {
    subscribe,
    useStore,
    deleteStore,
    connect,
    defaultId,
    register
  };
}
