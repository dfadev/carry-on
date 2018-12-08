import devTools from "./index";

test("new devTools", () => {
  const plugin = new devTools();
});

test("new devTools with opts", () => {
  const plugin = new devTools({ timeTravel: false });
});

test("subscribe is called", () => {
  let subscribeCalled = 0;
  let msgFn;
  let subscribe = (fn) => {
    subscribeCalled++;
    msgFn = fn;
  }

  window.__REDUX_DEVTOOLS_EXTENSION__ = {
    connect: (opts) => ({
      subscribe
    }),
    send: (action, state, opts) => {
      //no op
    }
  };

  const plugin = new devTools();
  let dispatchCount = 0;
  const dispatch = plugin.dispatch({ dispatch: (action, ...args) => {
    action && action();
    dispatchCount++;
    return { id: 1 };
  }});

  dispatch();
  dispatch(() => { });

  expect(subscribeCalled).toBe(1);
  expect(dispatchCount).toBe(2);

  msgFn({ type: "DISPATCH", payload: { type: "JUMP_TO_STATE", index: 0 } });

  expect(dispatchCount).toBe(3);

  msgFn({ type: "OTHER" });

  expect(dispatchCount).toBe(3);
});


test("disable timetravel works", () => {
  let subscribeCalled = 0;
  let msgFn;
  let subscribe = (fn) => {
    subscribeCalled++;
    msgFn = fn;
  }

  window.__REDUX_DEVTOOLS_EXTENSION__ = {
    connect: (opts) => ({
      subscribe
    }),
    send: (action, state, opts) => {
      //no op
    }
  };

  const plugin = new devTools({ timeTravel: false });
  let dispatchCount = 0;
  const dispatch = plugin.dispatch({ dispatch: (action, ...args) => {
    dispatchCount++;
    return { id: 1 };
  }});

  dispatch();
  dispatch(() => { });

  expect(subscribeCalled).toBe(0);
  expect(dispatchCount).toBe(2);

  msgFn && msgFn({ type: "DISPATCH", payload: { type: "JUMP_TO_STATE", index: 0 } });

  expect(dispatchCount).toBe(2);

  msgFn && msgFn({ type: "OTHER", payload: { type: "JUMP_TO_STATE", index: 0 } });

  expect(dispatchCount).toBe(2);
});


