import {
  getStore,
  deleteStore,
  connect,
  register,
  watch,
  Watch
} from "../src";

test("watch", async () => {
  Watch.Debug = true;
  Watch.Verbose = true;

  connect();
  let fnCalled = 0;
  const fn = (state, changes) => {
    if (state.a.field) fnCalled++;
  };
  register({ state: { a: { field: "value" } } });
  const store = getStore();

  const unsub_ws1 = watch({ id: "WS1", fn });
  const unsub_ws2 = watch({
    id: "WS2",
    select: s => s.a.field,
    fn: field => field && fnCalled++,
    throttle: 1000
  });

  store.set(state => {
    state.b = 2;
  });

  store.set(state => {
    state.a.field = 2;
  });

  store.set(state => {
    state.c = 2;
  });

  unsub_ws1();
  unsub_ws2();

  store.set(state => {
    state.a.field = 3;
  });

  expect(fnCalled).toBe(4);

  deleteStore();
});

