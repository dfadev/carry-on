/**
 * @jest-environment jsdom
 */
import { setLoggerOutput } from "carry-on-utils";
import {
  getStore,
  initStores,
  deleteStore,
  connect,
  subscribe,
  register,
  state,
  middleware,
  watchGet,
  debugStore,
  debugStores,
  set,
  get
} from "../src";

setLoggerOutput(() => {});

test("getStore", () => {
  debugStores(true);
  debugStores(true);
  const store = getStore();
  expect(store).toMatchSnapshot();
  deleteStore();
});

test("getStore named", () => {
  const store = getStore("store1");
  const state = connect({ id: "store1" });
  expect(store).toMatchSnapshot();
  expect(state).toMatchSnapshot();
  deleteStore();
});

test("deleteStore", () => {
  const store = getStore("store1");
  store.marker = 1;
  expect(store.marker).toBe(1);
  deleteStore("store1");
  const testStore = getStore("store1");
  expect(testStore.marker).toBe(undefined);
});

test("register", () => {
  const store = getStore();
  register({ state: { some: "state" } });
  expect(store.pending.length).toBe(1);
  deleteStore();
});

test("state", () => {
  const store = getStore();
  state({ some: "state" });
  expect(store.pending.length).toBe(1);
  deleteStore();
});

test("state fn", () => {
  const store = getStore();
  state(({ set }) => ({
    some: "state",
    fn() {
      set(state => (state.some = "other"));
    }
  }));
  expect(store.pending.length).toBe(1);
  deleteStore();
});

test("register with init as function", () => {
  const store = getStore();
  register({ state: ({ set }) => ({ some: "state" }) });
  expect(store.pending.length).toBe(1);
  deleteStore();
});

test("register on connected store", () => {
  const store = getStore();
  const initialState = connect();
  register({ state: { some: "state" } });
  expect(initialState).toMatchDiffSnapshot(store.state);
  deleteStore();
});

test("register on connected store with init as function", () => {
  const store = getStore();
  const initialState = connect();
  register({ state: ({ set }) => ({ some: "state" }) });
  expect(initialState).toMatchDiffSnapshot(store.state);
  deleteStore();
});

test("connect", () => {
  const store = getStore();
  const state = connect();
  expect(state).toMatchSnapshot();
  deleteStore();
});

test("connect with pending object state", () => {
  register({ state: { some: "state" } });
  const store = getStore();
  const state = connect();
  expect(state).toMatchSnapshot();
  deleteStore();
});

test("connect with pending function state", () => {
  register({ state: set => ({ some: "state" }) });
  const store = getStore();
  const state = connect();
  expect(state).toMatchSnapshot();
  deleteStore();
});

test("set action", () => {
  const state = connect();
  const store = getStore();
  store.set(state => {
    state.some = "state";
  });
  expect(store.state).toMatchSnapshot();
  deleteStore();
});

test("get with action", () => {
  const state = connect();
  const store = getStore();
  const q = store.get(state => ({ ...state, some: "state" }));
  expect(state).toMatchDiffSnapshot(q);
  deleteStore();
});

test("get with default action", () => {
  const state = connect();
  const store = getStore();
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
      ({ next }) =>
        (...args) => {
          pluginDispatchCalled++;
          return next(...args);
        },
      ({ next }) =>
        (...args) => {
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
      ({ next }) =>
        (...args) => {
          pluginDispatchCalled++;
          return next(...args);
        },
      ({ next }) =>
        (...args) => {
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
    middleware:
      ({ next }) =>
      (...args) => {
        pluginDispatchCalled++;
        return next(...args);
      }
  };

  register(plugin);
  const state = connect();
  expect(pluginDispatchCalled).toBe(1);
  deleteStore();
});

test("register with plugin, state function", () => {
  let pluginDispatchCalled = 0;

  const plugin = {
    state: ({ set }) => ({
      thing: 1,
      action() {
        return set(state => void (state.some = "state"));
      }
    }),
    middleware:
      ({ next }) =>
      (...args) => {
        pluginDispatchCalled++;
        return next(...args);
      }
  };

  register(plugin);
  const state = connect();
  expect(pluginDispatchCalled).toBe(1);
  const store = getStore();
  expect(store.state.action()).toMatchSnapshot();
  deleteStore();
});

test("register with plugin, no state and set", () => {
  const pluginDispatchCalled = 0;

  const plugin = {
    // id: "custom"
  };

  register(plugin);
  const state = connect();
  expect(state).toMatchSnapshot();
  const store = getStore();
  store.set(state => void (state.some = "state"));
  expect(store.state).toMatchSnapshot();
  deleteStore();
});

test("init stores removes all stores", () => {
  const store1 = getStore();
  initStores();
  const store2 = getStore();
  expect(store1).not.toBe(store2);
  debugStores(false);
  initStores();
  const store3 = getStore();
  expect(store2).not.toBe(store3);
  deleteStore();
});

test("get returns plugState when populated", () => {
  connect();
  const store = getStore();
  store.plugState = {};
  expect(store.get()).toBe(store.plugState);
  deleteStore();
});

test("get returns trappedState when populated", () => {
  connect();
  const store = getStore();
  const state = {};
  store.trappedState = { state };
  expect(store.get()).toBe(state);
  deleteStore();
});

test("nested set works", () => {
  connect();
  const store = getStore();
  const { set } = store;
  const rslt = set(state => {
    state.upper = "value";
    set(state => {
      state.upper2 = "value2";
      set(state => {
        state.upper3 = "value3";
        set(state => {
          state.upper4 = "value4";
          state.lower = "value";
          set(state => {});
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

test("nested set works with debug", () => {
  debugStores(false);
  debugStore(true);
  connect();
  const store = getStore();
  const { set } = store;
  const rslt = set(state => {
    state.upper = "value";
    set(state => {
      state.upper2 = "value2";
      set(state => {
        state.upper3 = "value3";
        set(state => {
          state.upper4 = "value4";
          state.lower = "value";
          set(state => {});
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

  const store = getStore();
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
  debugStores(false);
  debugStore(true);
  connect();
  let fnCalled = 0;
  const fn = (state, changes) => {
    fnCalled++;
  };
  register({ state: { a: { field: "value" } } });
  const store = getStore();

  const select = state => state.a;
  const [finalState, watch] = watchGet(store.get(), select);
  subscribe(fn, watch);

  store.set(state => {
    state.b = 2;
  });

  store.set(state => {
    state.a.field = 2;
  });

  expect(fnCalled).toBe(1);
  deleteStore();
});

test("watch subscribe field object change", () => {
  debugStores(false);
  connect();
  let fnCalled = 0;
  const fn = (state, changes) => {
    fnCalled++;
  };
  register({ state: { a: { field: "value" } } });
  const store = getStore();

  const select = state => state.a.field;
  const [finalState, watch] = watchGet(store.get(), select);
  subscribe(fn, watch);

  store.set(state => {
    state.b = 2;
  });

  store.set(state => {
    state.a = 2;
  });

  expect(fnCalled).toBe(1);
  deleteStore();
});

test("watch subscribe field value change", () => {
  connect();
  let fnCalled = 0;
  const fn = (state, changes) => {
    fnCalled++;
  };
  register({ state: { a: { field: "value" } } });
  const store = getStore();

  const select = state => state.a.field;
  const [finalState, watch] = watchGet(store.get(), select);
  subscribe(fn, watch);

  store.set(state => {
    state.b = 2;
  });

  store.set(state => {
    state.a.field = 2;
  });

  expect(fnCalled).toBe(1);
  deleteStore();
});

test("notify immediate", () => {
  let wrapCalled = 0;
  connect(undefined, fn => {
    wrapCalled++;
    fn();
  });
  let fnCalled = 0;
  const fn = (state, changes) => {
    fnCalled++;
  };
  register({ state: { a: { field: "value" } } });
  const store = getStore();

  const select = state => state.a.field;
  const [finalState, watch] = watchGet(store.get(), select);
  subscribe(fn, watch);

  store.set(
    state => {
      state.b = 2;
    },
    { immediate: true }
  );

  store.set(
    state => {
      state.a.field = 2;
    },
    { immediate: true }
  );

  expect(fnCalled).toBe(1);
  expect(wrapCalled).toBe(2); // Register, Register
  deleteStore();
});

test("connect via set/get", () => {
  expect(getStore()).toMatchSnapshot();
  set(state => ({ field: "value" }));
  expect(getStore()).toMatchSnapshot();
  deleteStore();

  expect(getStore()).toMatchSnapshot();
  const s = get();
  expect(getStore()).toMatchSnapshot();
  deleteStore();
});

test("debugStore", () => {
  expect(getStore()).toMatchSnapshot();
  debugStore();
  expect(getStore()).toMatchSnapshot();
  debugStore(false);
  expect(getStore()).toMatchSnapshot();
  deleteStore();
});

test("register with store id as first parameter", () => {
  register("store1", { state: { field: "value" } });
  expect(get("store1")).toMatchSnapshot();
  set("store1", state => {
    state.field = "value2";
  });
  expect(get("store1")).toMatchSnapshot();
  deleteStore();
});

test("wrap", () => {
  let wrapCalled = 0;
  connect(undefined, () => (wrapCalled += 1));
  connect(undefined, () => (wrapCalled += 1));

  expect(wrapCalled).toBe(1);
});
