import { useStore, deleteStore, connect, register } from "../src";

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
      ({ set }) => (...args) => {
        pluginDispatchCalled++;
        return set(...args);
      },
      ({ set }) => (...args) => {
        pluginDispatchCalled++;
        return set(...args);
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
      ({ set }) => (...args) => {
        pluginDispatchCalled++;
        return set(...args);
      },
      ({ set }) => (...args) => {
        pluginDispatchCalled++;
        return set(...args);
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
    middleware: ({ set }) => (...args) => {
      pluginDispatchCalled++;
      return set(...args);
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
    middleware: ({ set }) => (...args) => {
      pluginDispatchCalled++;
      return set(...args);
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
