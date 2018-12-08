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

  const createPlugins = (store, plugins) => {
    // create plugins
    store.plug = {};

    if (!Array.isArray(plugins)) plugins = [plugins];

    // dispatch
    for (const plugin of plugins) {
      const { dispatch } = plugin;
      if (dispatch)
        store.d = applyMiddleware(dispatch, store.d, (middleware, fn) =>
          middleware(fn, store.query, store.plug)
        );
    }

    // state
    for (const plugin of plugins) {
      const { id, state } = plugin;
      if (state)
        store.plug[id] = isFunction(state)
          ? state(store.d, store.query, store.plug)
          : state;
    }
  };

  // a map of stores
  const stores = {};

  // create a store
  function create(id) {
    return Object.assign({ id, pending: [] }, extra());
  }

  // delete a store
  function deleteStore(id = defaultId) {
    delete stores[id];
  }

  // lookup a store
  const useStore = (id = defaultId) => stores[id] || (stores[id] = create(id));

  // register state
  const register = (init, id = defaultId) => {
    const { dispatch, query, pending } = useStore(id);
    // queue if no dispatch available yet
    if (dispatch)
      dispatch(state =>
        Object.assign(
          {},
          state,
          isFunction(init) ? init(dispatch, query) : init
        )
      );
    else pending.push(init);
  };

  const connect = ({ id, producer, publish, plugins, init } = {}) => {
    const store = useStore(id);
    if (store.dispatch) throw new Error("Already connected");

    // the producer creates new states from old states by executing actions
    store.producer = producer || ((state, action) => action({ ...state }));

    // query provides a copy of state created by the producer
    store.query = (action = identity => identity, ...args) =>
      store.producer(store.state, action, ...args);

    // run producer action and set state
    store.d = (action, type, force) => {
      const nextState = (store.state = force
        ? action(store.state)
        : store.producer(store.state, action));
      if (publish && type !== initMessage) {
        publish(nextState);
      }
      return nextState;
    };

    if (plugins) createPlugins(store, plugins);
    store.dispatch = store.d;

    // create initial state
    store.state = Object.assign(
      {},
      // execute store initialization
      isFunction(init) ? init(store.dispatch, store.query, store.plug) : init,
      // execute pending store initialization
      ...store.pending.map(
        pending =>
          isFunction(pending)
            ? pending(store.dispatch, store.query, store.plug)
            : pending
      ),
      // add standard keys
      {
        dispatch: store.dispatch,
        query: store.query,
        plug: store.plug
      },
      store.id ? { id: store.id } : undefined
    );

    // initialize middleware with state
    if (plugins) store.dispatch(() => store.state, initMessage);

    return store.state;
  };

  return {
    useStore,
    deleteStore,
    connect,
    defaultId,
    register
  };
}
