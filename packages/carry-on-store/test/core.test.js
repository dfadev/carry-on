import {
  useStore,
  initStores,
  deleteStore,
  connect,
  subscribe,
  register,
  watchGet
} from "../src";

test("useStore", () => {
  const store = useStore();
  expect(store).toMatchSnapshot();
  deleteStore();
});

test("useStore named", () => {
  const store = useStore("store1");
  const state = connect({ id: "store1" });
  expect(store).toMatchSnapshot();
  expect(state).toMatchSnapshot();
  deleteStore();
});

test("deleteStore", () => {
  const store = useStore("store1");
  store.marker = 1;
  expect(store.marker).toBe(1);
  deleteStore("store1");
  const testStore = useStore("store1");
  expect(testStore.marker).toBe(undefined);
});

test("register", () => {
  const store = useStore();
  register({ state: { some: "state" } });
  expect(store.pending.length).toBe(1);
  deleteStore();
});

test("register with init as function", () => {
  const store = useStore();
  register({ state: ({ set }) => ({ some: "state" }) });
  expect(store.pending.length).toBe(1);
  deleteStore();
});

test("register on connected store", () => {
  const store = useStore();
  const initialState = connect();
  register({ state: { some: "state" } });
  expect(initialState).toMatchDiffSnapshot(store.state);
  deleteStore();
});

test("register on connected store with init as function", () => {
  const store = useStore();
  const initialState = connect();
  register({ state: ({ set }) => ({ some: "state" }) });
  expect(initialState).toMatchDiffSnapshot(store.state);
  deleteStore();
});

test("connect", () => {
  const store = useStore();
  const state = connect();
  expect(state).toMatchSnapshot();
  deleteStore();
});

test("connect with pending object state", () => {
  register({ state: { some: "state" } });
  const store = useStore();
  const state = connect();
  expect(state).toMatchSnapshot();
  deleteStore();
});

test("connect with pending function state", () => {
  register({ state: set => ({ some: "state" }) });
  const store = useStore();
  const state = connect();
  expect(state).toMatchSnapshot();
  deleteStore();
});

test("set action", () => {
  const state = connect();
  const store = useStore();
  store.set(state => {
    state.some = "state";
  });
  expect(store.state).toMatchSnapshot();
  deleteStore();
});

test("get with action", () => {
  const state = connect();
  const store = useStore();
  const q = store.get(state => ({ ...state, some: "state" }));
  expect(state).toMatchDiffSnapshot(q);
  deleteStore();
});

test("get with default action", () => {
  const state = connect();
  const store = useStore();
  const q = store.get();
  expect(state).toBe(q);
  deleteStore();
});

test("connect to already connected store succeeds", () => {
  const state = connect();
  expect(connect).not.toThrow();
  deleteStore();
});

test("register with plugin with multiple middleware", () => {
  let pluginDispatchCalled = 0;

  const plugin = {
    state: {
      thing: 1
    },
    middleware: [
      ({ next }) => (...args) => {
        pluginDispatchCalled++;
        return next(...args);
      },
      ({ next }) => (...args) => {
        pluginDispatchCalled++;
        return next(...args);
      }
    ]
  };

  register(plugin);
  const state = connect();
  expect(pluginDispatchCalled).toBe(2);
  deleteStore();
});

test("register with plugins set as array", () => {
  let pluginDispatchCalled = 0;

  const plugin = {
    state: {
      thing: 1
    },
    middleware: [
      ({ next }) => (...args) => {
        pluginDispatchCalled++;
        return next(...args);
      },
      ({ next }) => (...args) => {
        pluginDispatchCalled++;
        return next(...args);
      }
    ]
  };

  register(plugin);
  const state = connect();
  expect(pluginDispatchCalled).toBe(2);
  deleteStore();
});

test("register with plugins as non-array", () => {
  let pluginDispatchCalled = 0;

  const plugin = {
    state: {
      thing: 1
    },
    middleware: ({ next }) => (...args) => {
      pluginDispatchCalled++;
      return next(...args);
    }
  };

  register(plugin);
  const state = connect();
  expect(pluginDispatchCalled).toBe(1);
  deleteStore();
});

test("register with plugin, state function ", () => {
  let pluginDispatchCalled = 0;

  const plugin = {
    state: ({ set }) => ({
      thing: 1,
      action() {
        return set(state => void (state.some = "state"));
      }
    }),
    middleware: ({ next }) => (...args) => {
      pluginDispatchCalled++;
      return next(...args);
    }
  };

  register(plugin);
  const state = connect();
  expect(pluginDispatchCalled).toBe(1);
  const store = useStore();
  expect(store.state.action()).toMatchSnapshot();
  deleteStore();
});

test("register with plugin, no state and set", () => {
  let pluginDispatchCalled = 0;

  const plugin = {
    //id: "custom"
  };

  register(plugin);
  const state = connect();
  expect(state).toMatchSnapshot();
  const store = useStore();
  store.set(state => void (state.some = "state"));
  expect(store.state).toMatchSnapshot();
  deleteStore();
});

test("init stores removes all stores", () => {
  const store1 = useStore();
  initStores();
  const store2 = useStore();
  expect(store1).not.toBe(store2);
  deleteStore();
});

test("get returns plugState when populated", () => {
  connect();
  const store = useStore();
  store.plugState = {};
  expect(store.get()).toBe(store.plugState);
  deleteStore();
});

test("get returns trappedState when populated", () => {
  connect();
  const store = useStore();
  const state = {};
  store.trappedState = { state };
  expect(store.get()).toBe(state);
  deleteStore();
});

test("nested set works", () => {
  connect();
  const store = useStore();
  const set = store.set;
  const rslt = set(state => {
    state.upper = "value";
    set(state => {
      state.upper2 = "value2";
      set(state => {
        state.upper3 = "value3";
        set(state => {
          state.upper4 = "value4";
          state.lower = "value";
        });
        state.lower2 = "value2";
      });
      state.lower3 = "value3";
    });
    state.lower4 = "value4";
  });
  expect(rslt).toMatchSnapshot();
  deleteStore();
});

test("prioritized registration works", () => {
  register({
    state: {
      p: -1
    }
  });

  register({
    state: {
      p: 0
    }
  });

  register({
    priority: 1,
    state: {
      p: 1
    }
  });

  register({
    priority: 2,
    state: {
      p: 2
    }
  });

  register({
    priority: 3,
    state: {
      p: 3
    }
  });

  connect();

  const store = useStore();
  const state = store.get();
  expect(state.p).toBe(0);
  deleteStore();
});

test("subscribe is called", () => {
  connect();
  let fnCalled = 0;
  const fn = (state, changes) => {
    fnCalled++;
  };
  subscribe(fn);
  register({ state: { a: 1 } });
  expect(fnCalled).toBe(1);
  deleteStore();
});

test("subscribe with a watch works", () => {
  connect();
  let fnCalled = 0;
  const fn = (state, changes) => {
    fnCalled++;
  };
  register({ state: { a: { field: "value" } } });
  const store = useStore();

  const select = state => state.a;
  const [ finalState, watch ] = watchGet(store.get(), select);
  subscribe(fn, watch);

  store.set(state => {
    state.b = 2;
  });

  store.set(state => {
    state.a.field = 2;
  });

  expect(fnCalled).toBe(1);
});

