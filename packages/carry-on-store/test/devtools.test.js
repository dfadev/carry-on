import devTools from "../src/devtools";

test("new devTools", () => {
  const plugin = new devTools();
});

test("new devTools with opts", () => {
  const plugin = new devTools({ timeTravel: false });
});

test("subscribe is called", () => {
  let subscribeCalled = 0;
  let msgFn;
  let subscribe = fn => {
    subscribeCalled++;
    msgFn = fn;
  };

  window.__REDUX_DEVTOOLS_EXTENSION__ = {
    connect: opts => ({
      subscribe,
      send: (action, state) => {}
    })
  };

  const plugin = new devTools();
  let setCount = 0;
  let set = (action, ...args) => {
    action && action({});
    setCount++;
    return { id: 1 };
  };
  set = plugin.middleware({ isNested: () => false, set, next: set });

  set();
  set(() => {});

  expect(subscribeCalled).toBe(1);
  expect(setCount).toBe(2);

  msgFn({ type: "DISPATCH", payload: { type: "JUMP_TO_STATE", index: 0 } });

  expect(setCount).toBe(3);

  msgFn({ type: "OTHER" });

  expect(setCount).toBe(3);
});

test("disable timetravel works", () => {
  let subscribeCalled = 0;
  let msgFn;
  let subscribe = fn => {
    subscribeCalled++;
    msgFn = fn;
  };

  window.__REDUX_DEVTOOLS_EXTENSION__ = {
    connect: opts => ({
      subscribe,
      send: (action, state) => {}
    })
  };

  const plugin = new devTools({ timeTravel: false });
  let setCount = 0;
  let set = (action, ...args) => {
    action && action();
    setCount++;
    return { id: 1 };
  };
  set = plugin.middleware({ isNested: () => false, set, next: set });

  set(() => {});
  set(() => {}, "Time Travel");
  set(() => {});

  expect(subscribeCalled).toBe(0);
  expect(setCount).toBe(3);

  msgFn &&
    msgFn({ type: "DISPATCH", payload: { type: "JUMP_TO_STATE", index: 0 } });

  expect(setCount).toBe(3);

  msgFn &&
    msgFn({ type: "OTHER", payload: { type: "JUMP_TO_STATE", index: 0 } });

  expect(setCount).toBe(3);
});

test("dispose", () => {
  let subscribeCalled = 0;
  let unsubscribeCalled = 0;
  let msgFn;
  let subscribe = fn => {
    subscribeCalled++;
    msgFn = fn;
    return () => {
      unsubscribeCalled++;
    };
  };

  window.__REDUX_DEVTOOLS_EXTENSION__ = {
    connect: opts => ({
      subscribe,
      send: (action, state) => {}
    })
  };

  const plugin = new devTools();
  let setCount = 0;
  let set = (action, ...args) => {
    action && action({});
    setCount++;
    return { id: 1 };
  };
  set = plugin.middleware({ isNested: () => false, set, next: set });

  set(() => {});

  expect(subscribeCalled).toBe(1);

  plugin.dispose();
});

test("nested", () => {
  let subscribeCalled = 0;
  let msgFn;
  let subscribe = fn => {
    subscribeCalled++;
    msgFn = fn;
  };

  window.__REDUX_DEVTOOLS_EXTENSION__ = {
    connect: opts => ({
      subscribe,
      send: (action, state) => {}
    })
  };

  const plugin = new devTools({ timeTravel: true });
  let setCount = 0;
  let set = (action, ...args) => {
    action && action();
    setCount++;
    return { id: 1 };
  };

  set = plugin.middleware({ isNested: () => true, set, next: set });

  set(() => {});
  set(() => {}, "Time Travel");
  set(() => {});

  expect(subscribeCalled).toBe(2);
  expect(setCount).toBe(3);

  msgFn &&
    msgFn({ type: "DISPATCH", payload: { type: "JUMP_TO_STATE", index: 0 } });

  expect(setCount).toBe(4);

  msgFn &&
    msgFn({ type: "OTHER", payload: { type: "JUMP_TO_STATE", index: 0 } });

  expect(setCount).toBe(4);
});

test("tt", () => {
  let subscribeCalled = 0;
  let msgFn;
  let subscribe = fn => {
    subscribeCalled++;
    msgFn = fn;
  };

  window.__REDUX_DEVTOOLS_EXTENSION__ = {
    connect: opts => ({
      subscribe,
      send: (action, state) => {}
    })
  };

  const plugin = new devTools({ timeTravel: true });
  let setCount = 0;
  let state = {};
  let set = (action, ...args) => {
    setCount++;
    state = action && action(state);
    return state;
  };

  set = plugin.middleware({ isNested: () => false, set, next: set });

  set(state => ({ field2: "value", field3: "value" }));
  set(state => ({ field3: "value", none: "field" }));

  msgFn &&
    msgFn({ type: "DISPATCH", payload: { type: "JUMP_TO_STATE", index: 0 } });

  expect(state).toMatchSnapshot();
});
