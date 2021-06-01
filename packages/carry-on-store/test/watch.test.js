/**
 * @jest-environment jsdom
 */
import { getStore, deleteStore, connect, register, watch, Watch } from "../src";

test("watch", () => {
  Watch.Debug = true;
  Watch.Verbose = true;

  connect();
  let fnCalled = 0;
  const fn = (state, changes) => {
    if (state.a.field) fnCalled++;
  };
  let elseCalled = 0;
  const elseFn = state => {
    elseCalled += 1;
  };
  let errorCalled = 0;
  const errorFn = (error, state) => {
    errorCalled += 1;
  };

  register({ state: { a: { field: "value" } } });
  const store = getStore();

  const unsub_ws1 = watch({
    id: "WS1",
    register: { state: { junk: "value" } },
    if: fn
  });
  const unsub_ws2 = watch({
    id: "WS2",
    if: s => s.a.field > 1,
    then: field => field && fnCalled++,
    else: elseFn,
    throttle: 1000
  });

  const unsub_ws3 = watch({
    debug: false,
    id: "WS3",
    path: "a.field",
    def: 0,
    if: v => v > 1,
    then: () => {
      fnCalled += 1;
      throw new Error("fake error");
    },
    else: elseFn,
    error: errorFn
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
  unsub_ws3();

  store.set(state => {
    state.a.field = 3;
  });

  expect(fnCalled).toBe(4);
  expect(elseCalled).toBe(2);
  expect(errorCalled).toBe(1);

  expect(store.get()).toMatchSnapshot();

  deleteStore();
});
