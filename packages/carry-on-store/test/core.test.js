import { makeStoreModule } from "../src";

test("useStore", () => {
  const { useStore, deleteStore, connect, register } = makeStoreModule();

  const store = useStore();
  expect(store).toMatchSnapshot();
  deleteStore();
});

test("useStore named", () => {
  const { useStore, deleteStore, connect, register } = makeStoreModule();

  const store = useStore("store1");
  const state = connect({ id: "store1" });
  expect(store).toMatchSnapshot();
  expect(state).toMatchSnapshot();
  deleteStore();
});

test("deleteStore", () => {
  const { useStore, deleteStore, connect, register } = makeStoreModule();

  const store = useStore("store1");
  store.marker = 1;
  expect(store.marker).toBe(1);
  deleteStore("store1");
  const testStore = useStore("store1");
  expect(testStore.marker).toBe(undefined);
});

test("register", () => {
  const { useStore, deleteStore, connect, register } = makeStoreModule();

  const store = useStore();
  register({ state: { some: "state" } });
  expect(store.pending.length).toBe(1);
  deleteStore();
});

test("register with init as function", () => {
  const { useStore, deleteStore, connect, register } = makeStoreModule();

  const store = useStore();
  register({ state: ({ dispatch }) => ({ some: "state" }) });
  expect(store.pending.length).toBe(1);
  deleteStore();
});

test("register on connected store", () => {
  const { useStore, deleteStore, connect, register } = makeStoreModule();
  const store = useStore();
  const initialState = connect();
  register({ state: { some: "state" } });
  expect(initialState).toMatchDiffSnapshot(store.state);
  deleteStore();
});

test("register on connected store with init as function", () => {
  const { useStore, deleteStore, connect, register } = makeStoreModule();
  const store = useStore();
  const initialState = connect();
  register({ state: ({ dispatch }) => ({ some: "state" }) });
  expect(initialState).toMatchDiffSnapshot(store.state);
  deleteStore();
});

test("connect", () => {
  const { useStore, deleteStore, connect } = makeStoreModule();
  const store = useStore();
  const state = connect();
  expect(state).toMatchSnapshot();
  deleteStore();
});

test("connect with pending object state", () => {
  const { useStore, deleteStore, connect, register } = makeStoreModule();
  register({ state: { some: "state" } });
  const store = useStore();
  const state = connect();
  expect(state).toMatchSnapshot();
  deleteStore();
});

test("connect with pending function state", () => {
  const { useStore, deleteStore, connect, register } = makeStoreModule();
  register({ state: dispatch => ({ some: "state" }) });
  const store = useStore();
  const state = connect();
  expect(state).toMatchSnapshot();
  deleteStore();
});

//test("connect with init as function", () => {
  //// connect with init no longer supported, use register instead
  //const { useStore, deleteStore, connect } = makeStoreModule();
  //const state = connect({ init: ({ dispatch }) => ({ some: "state" }) });
  //expect(state).toMatchSnapshot();
  //deleteStore();
//});

//test("connect with init as object", () => {
  //// connect with init no longer supported, use register instead
  //const { useStore, deleteStore, connect } = makeStoreModule();
  //const state = connect({ init: { some: "state" } });
  //expect(state).toMatchSnapshot();
  //deleteStore();
//});

test("dispatch action", () => {
  const { useStore, deleteStore, connect } = makeStoreModule();
  const state = connect();
  const store = useStore();
  store.dispatch(state => ({ ...state, some: "state" }));
  expect(store.state).toMatchSnapshot();
  deleteStore();
});

test("query with action", () => {
  const { useStore, deleteStore, connect } = makeStoreModule();
  const state = connect();
  const store = useStore();
  const q = store.query(state => ({ ...state, some: "state" }));
  expect(state).toMatchDiffSnapshot(q);
  deleteStore();
});

test("query with default action", () => {
  const { useStore, deleteStore, connect } = makeStoreModule();
  const state = connect();
  const store = useStore();
  const q = store.query();
  expect(state).toBe(q);
  deleteStore();
});

test("connect to already connected store succeeds", () => {
  const { useStore, deleteStore, connect } = makeStoreModule();
  const state = connect();
  expect(connect).not.toThrow();
  deleteStore();
});

test("force dispatch", () => {
  const { useStore, deleteStore, connect } = makeStoreModule();
  const state = connect();
  const store = useStore();
  store.dispatch(state => ({ ...state, some: "forced state" }), "", true);
  expect(store.state).toMatchSnapshot();
  deleteStore();
});

test("register with plugin with multiple middleware", () => {
  const { useStore, deleteStore, connect, register } = makeStoreModule();
  let pluginDispatchCalled = 0;

  const plugin = {
    state: {
      thing: 1
    },
    dispatch: [
      ({ dispatch }) => (...args) => {
        pluginDispatchCalled++;
        return dispatch(...args);
      },
      ({ dispatch }) => (...args) => {
        pluginDispatchCalled++;
        return dispatch(...args);
      }
    ]
  };

  register(plugin);
  const state = connect();
  expect(pluginDispatchCalled).toBe(2);
  deleteStore();
});

test("register with plugins dispatch as array", () => {
  const { useStore, deleteStore, connect, register } = makeStoreModule();
  let pluginDispatchCalled = 0;

  const plugin = {
    state: {
      thing: 1
    },
    dispatch: [
      ({ dispatch }) => (...args) => {
        pluginDispatchCalled++;
        return dispatch(...args);
      },
      ({ dispatch }) => (...args) => {
        pluginDispatchCalled++;
        return dispatch(...args);
      }
    ]
  };

  register(plugin);
  const state = connect();
  expect(pluginDispatchCalled).toBe(2);
  deleteStore();
});

test("register with plugins as non-array", () => {
  const { useStore, deleteStore, connect, register } = makeStoreModule();
  let pluginDispatchCalled = 0;

  const plugin = {
    state: {
      thing: 1
    },
    dispatch: ({ dispatch }) => (...args) => {
      pluginDispatchCalled++;
      return dispatch(...args);
    }
  };

  register(plugin);
  const state = connect();
  expect(pluginDispatchCalled).toBe(1);
  deleteStore();
});

test("register with plugin, state function ", () => {
  const { useStore, deleteStore, connect, register } = makeStoreModule();
  let pluginDispatchCalled = 0;

  const plugin = {
    state: ({ dispatch }) => ({
      thing: 1,
      action() {
        return dispatch(state => ({ ...state, some: "state" }));
      }
    }),
    dispatch: ({ dispatch }) => (...args) => {
      pluginDispatchCalled++;
      return dispatch(...args);
    }
  };

  register(plugin);
  const state = connect();
  expect(pluginDispatchCalled).toBe(1);
  const store = useStore();
  expect(store.state.action()).toMatchSnapshot();
  deleteStore();
});

test("register with plugin, no state and dispatch", () => {
  const { useStore, deleteStore, connect, register } = makeStoreModule();
  let pluginDispatchCalled = 0;

  const plugin = {
    //id: "custom"
  };

  register(plugin);
  const state = connect();
  expect(state).toMatchSnapshot();
  const store = useStore();
  store.dispatch(state => ({ ...state, some: "state" }));
  expect(store.state).toMatchSnapshot();
  deleteStore();
});
