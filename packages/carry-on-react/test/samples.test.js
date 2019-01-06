/** @format **/
import React, { Fragment } from "react";
import { State } from "../src";
import {
  register,
  deleteStore,
  notify as notifyListeners,
  transaction,
  initStores
} from "carry-on-store";
import { wait, render, fireEvent, waitForElement } from "react-testing-library";

afterEach(() => {
  initStores();
});

// default store
test("default store", () => {
  const store = {
    state: ({ set }) => ({
      counter: 0,
      inc: () => set(state => void state.counter++),
      dec: () => set(state => void state.counter--)
    })
  };

  register(store);

  const App = () => (
    <State>
      {({ counter, inc, dec }) => (
        <>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
        </>
      )}
    </State>
  );

  const { asFragment, getByText, debug } = render(<App />);
  let dom = asFragment();

  function clickDiff(text) {
    fireEvent.click(getByText(text));
    const nextDom = asFragment();
    expect(dom).toMatchDiffSnapshot(nextDom);
    dom = nextDom;
  }

  clickDiff("+");
  clickDiff("-");
  clickDiff("+");
  clickDiff("-");
  deleteStore();
});

// two named stores
test("two named stores", () => {
  const store = {
    state: ({ set }) => ({
      counter: 0,
      inc: () => set(state => void state.counter++),
      dec: () => set(state => void state.counter--)
    })
  };

  register(store, "store1");
  register(store, "store2");

  const App = () => (
    <>
      <State from="store1">
        {({ counter, inc, dec }) => {
          return (
            <div>
              <div>Counter: {counter}</div>
              <button onClick={inc}>store1 +</button>
              <button onClick={dec}>store1 -</button>
            </div>
          );
        }}
      </State>
      <State from="store2">
        {({ counter, inc, dec }) => (
          <div>
            <div>Counter: {counter}</div>
            <button onClick={inc}>store2 +</button>
            <button onClick={dec}>store2 -</button>
          </div>
        )}
      </State>
    </>
  );

  const { asFragment, getByText } = render(<App />);
  let dom = asFragment();

  function clickDiff(text) {
    fireEvent.click(getByText(text));
    const nextDom = asFragment();
    expect(dom).toMatchDiffSnapshot(nextDom);
    dom = nextDom;
  }

  clickDiff("store1 +");
  clickDiff("store1 -");
  clickDiff("store2 +");
  clickDiff("store2 -");
  clickDiff("store1 +");
  clickDiff("store1 -");
  clickDiff("store2 +");
  clickDiff("store2 -");

  deleteStore("store1");
  deleteStore("store2");
});

// select
test("select", () => {
  const store = {
    state: ({ set }) => ({
      notSelected: "item",
      counter: 0,
      inc: () => set(state => void state.counter++),
      dec: () => set(state => void state.counter--)
    })
  };

  register(store);

  const select = ({ counter, inc, dec }) => ({ counter, inc, dec });

  const App = props => (
    <State select={select}>
      {({ counter, inc, dec, notSelected }) => (
        <div>
          <div>{notSelected}</div>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
        </div>
      )}
    </State>
  );

  const { asFragment, getByText, queryByText } = render(<App />);
  const notSelected = queryByText("item");
  expect(notSelected).toBeNull();

  let dom = asFragment();

  function clickDiff(text) {
    fireEvent.click(getByText(text));
    const nextDom = asFragment();
    expect(dom).toMatchDiffSnapshot(nextDom);
    dom = nextDom;
  }

  clickDiff("+");
  clickDiff("-");
  clickDiff("+");
  clickDiff("-");
  deleteStore();
});

// get
test("get", () => {
  let marker = 0;

  const store = {
    state: ({ set, get }) => ({
      log(msg) {
        get(state => {
          marker++;
          state.counter = 9999;
          return state;
        });
      },
      counter: 0,
      inc: () => set(state => void state.counter++),
      dec: () => set(state => void state.counter--)
    })
  };

  register(store);

  const App = () => (
    <State>
      {({ counter, inc, dec, log }) => (
        <>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
          <button onClick={log}>log</button>
        </>
      )}
    </State>
  );

  const { asFragment, getByText } = render(<App />);

  let dom = asFragment();

  function clickDiff(text) {
    fireEvent.click(getByText(text));
    const nextDom = asFragment();
    expect(dom).toMatchDiffSnapshot(nextDom);
    dom = nextDom;
  }

  clickDiff("log");
  expect(marker).toEqual(1);
  deleteStore();
});

// register
test("register", () => {
  register({
    state: ({ set }) => ({
      counter: 0,
      inc: () => set(state => void state.counter++),
      dec: () => set(state => void state.counter--)
    })
  });

  const App = () => (
    <State>
      {({ counter, inc, dec }) => (
        <>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
        </>
      )}
    </State>
  );

  const { asFragment, getByText } = render(<App />);

  let dom = asFragment();

  function clickDiff(text) {
    fireEvent.click(getByText(text));
    const nextDom = asFragment();
    expect(dom).toMatchDiffSnapshot(nextDom);
    dom = nextDom;
  }

  clickDiff("+");
  clickDiff("-");
  clickDiff("+");
  clickDiff("-");
  deleteStore();
});

// register on named store
test("register on named store", () => {
  register(
    {
      state: ({ set }) => ({
        counter: 0,
        inc: () => set(state => void state.counter++),
        dec: () => set(state => void state.counter--)
      })
    },
    "store1"
  );

  const App = () => (
    <State from="store1">
      {({ counter, inc, dec }) => (
        <>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
        </>
      )}
    </State>
  );

  const { asFragment, getByText } = render(<App />);

  let dom = asFragment();

  function clickDiff(text) {
    fireEvent.click(getByText(text));
    const nextDom = asFragment();
    expect(dom).toMatchDiffSnapshot(nextDom);
    dom = nextDom;
  }

  clickDiff("+");
  clickDiff("-");
  clickDiff("+");
  clickDiff("-");
  deleteStore("store1");
});

// register adding pending state to store
test("register adding pending state to store", () => {
  register({
    state: ({ set }) => ({
      counter: 0,
      inc: () => set(state => void state.counter++),
      dec: () => set(state => void state.counter--)
    })
  });

  register({
    state: () => ({
      extraVal: "ok"
    })
  });

  const App = () => (
    <State>
      {({ counter, inc, dec, extraVal }) => (
        <>
          <div>{extraVal}</div>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
        </>
      )}
    </State>
  );

  const { asFragment, getByText, queryByText } = render(<App />);

  const okNode = queryByText("ok");
  expect(okNode).not.toBeNull();
  let dom = asFragment();

  function clickDiff(text) {
    fireEvent.click(getByText(text));
    const nextDom = asFragment();
    expect(dom).toMatchDiffSnapshot(nextDom);
    dom = nextDom;
  }

  clickDiff("+");
  clickDiff("-");
  clickDiff("+");
  clickDiff("-");
  deleteStore();
});

// path
test("path", () => {
  register({
    state: ({ set }) => ({
      more: {
        stuff: {
          list: [{ item: "one" }, { item: "two" }]
        }
      }
    })
  });

  const App = () => (
    <State path="more.stuff.list[0].item">
      {item => {
        return <div>{item}</div>;
      }}
    </State>
  );

  const { asFragment, getByText } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

test("path2", () => {
  register({
    state: ({ set }) => ({
      more: {
        stuff: {
          list: [{ item: "one" }, { item: "two" }]
        }
      }
    })
  });

  const App = () => (
    <State path="oops.more.stuff.list[0].item" default="ok">
      {item => {
        return <div>{item}</div>;
      }}
    </State>
  );

  const { asFragment, getByText } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

// from and path
test("from and path", () => {
  register(
    {
      state: ({ set }) => ({
        more: {
          stuff: {
            list: [
              {
                item: "one"
              },
              {
                item: "two"
              }
            ]
          }
        }
      })
    },
    "store1"
  );

  const App = () => (
    <State from="store1" path="more.stuff.list[0].item">
      {item => <div>{item}</div>}
    </State>
  );

  const { asFragment, getByText } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore("store1");
});

test("get returns undefined", () => {
  let marker = 0;

  const store = {
    state: ({ set, get }) => ({
      log(msg) {
        let rslt = get(state => {
          return undefined;
          //state.counter = 9999;
          //return state;
        });
        if (rslt === undefined) {
          marker++;
        } else console.log(rslt);
      },
      counter: 0,
      inc: () => set(state => void state.counter++),
      dec: () => set(state => void state.counter--)
    })
  };

  register(store);

  const App = () => (
    <State>
      {({ counter, inc, dec, log }) => (
        <>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
          <button onClick={log}>log</button>
        </>
      )}
    </State>
  );

  const { asFragment, getByText } = render(<App />);

  let dom = asFragment();

  function clickDiff(text) {
    fireEvent.click(getByText(text));
    const nextDom = asFragment();
    expect(dom).toMatchDiffSnapshot(nextDom);
    dom = nextDom;
  }

  clickDiff("log");
  expect(marker).toEqual(1);
  deleteStore();
});

// multiple select
test("multiple select", () => {
  register({
    state: ({ set }) => ({
      counter: 0,
      inc: () => set(state => void state.counter++),
      dec: () => set(state => void state.counter--)
    })
  });

  const selectCounter = ({ counter }) => counter;
  const selectActions = ({ inc, dec }) => ({ inc, dec });

  const App = props => (
    <div>
      <State select={selectCounter}>
        {counter => (
          <>
            <div>Counter: {counter}</div>
            <State select={selectActions}>
              {({ inc, dec }) => (
                <Fragment>
                  <button onClick={inc}>+</button>
                  <button onClick={dec}>-</button>
                </Fragment>
              )}
            </State>
          </>
        )}
      </State>
    </div>
  );

  const { asFragment, getByText } = render(<App />);

  let dom = asFragment();

  function clickDiff(text) {
    fireEvent.click(getByText(text));
    const nextDom = asFragment();
    expect(dom).toMatchDiffSnapshot(nextDom);
    dom = nextDom;
  }

  clickDiff("+");
  clickDiff("-");
  clickDiff("+");
  clickDiff("-");
  deleteStore();
});

// transaction/commit/rollback
test("transaction/commit/rollback", () => {
  let commits = 0;
  let rollbacks = 0;
  let commitException = 0;
  let rollbackException = 0;

  register({
    state: ({ set, get }) => ({
      counter: 0,
      inc: () => set(state => void state.counter++, "Decrement"),
      dec: () => set(state => void state.counter--, "Increment"),
      beginClick(msg) {
        get(state => state.begin());
      },
      commitClick() {
        const before = get();
        try {
          const after = get(state => state.commit());
        } catch (e) {
          commitException += 1;
        }
        commits++;
      },
      rollbackClick() {
        const before = get();
        try {
          const after = get(state => state.rollback());
        } catch (e) {
          rollbackException += 1;
        }
        rollbacks++;
      }
    })
  });

  register(transaction());

  const App = () => (
    <State>
      {({ counter, inc, dec, beginClick, commitClick, rollbackClick }) => (
        <Fragment>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
          <button onClick={beginClick}>begin tx</button>
          <button onClick={commitClick}>commit</button>
          <button onClick={rollbackClick}>rollback</button>
        </Fragment>
      )}
    </State>
  );

  const { asFragment, getByText } = render(<App />);

  let dom = asFragment();

  function clickDiff(text) {
    fireEvent.click(getByText(text));
    const nextDom = asFragment();
    expect(dom).toMatchDiffSnapshot(nextDom);
    dom = nextDom;
  }

  clickDiff("begin tx");
  clickDiff("+");
  clickDiff("+");
  clickDiff("+");
  clickDiff("rollback");
  clickDiff("begin tx");
  clickDiff("+");
  clickDiff("+");
  clickDiff("commit");

  clickDiff("commit");
  //await wait(() => expect(commits).toBe(2));
  expect(commits).toBe(2);
  expect(commitException).toEqual(1);
  clickDiff("rollback");
  //await wait(() => expect(rollbacks).toBe(2));
  expect(rollbacks).toBe(2);
  expect(rollbackException).toEqual(1);
  deleteStore();
});

// notifyListeners/subscribe/unsubscribe
test("notifyListeners/subscribe/unsubscribe", () => {
  register({
    state: ({ set, get }) => ({
      counter: 0,
      inc: () => set(state => void state.counter++, "Decrement"),
      dec: () => set(state => void state.counter--, "Increment")
    })
  });

  let marker = 0;
  const notify = notifyListeners();
  register(notify.plugin);
  const unsubscribe = notify.subscribe(state => {
    marker = 1;
  });

  const App = () => (
    <State>
      {({ counter, inc, dec }) => (
        <Fragment>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
        </Fragment>
      )}
    </State>
  );

  const { asFragment, getByText } = render(<App />);

  let dom = asFragment();

  function clickDiff(text) {
    fireEvent.click(getByText(text));
    const nextDom = asFragment();
    expect(dom).toMatchDiffSnapshot(nextDom);
    dom = nextDom;
  }

  clickDiff("+");
  expect(marker).toEqual(1);
  unsubscribe();
  clickDiff("+");
  expect(marker).toEqual(1);
  deleteStore();
});

test("State component can render empty and null children", () => {
  register({
    state: ({ set, get }) => ({
      counter: 0,
      inc: () => set(state => void state.counter++, "Decrement"),
      dec: () => set(state => void state.counter--, "Increment")
    })
  });

  const App = () => (
    <>
      <State />
      <State>{null}</State>
    </>
  );

  const { asFragment, getByText } = render(<App />);
  let dom = asFragment();
  expect(dom).toMatchSnapshot();
  deleteStore();
});

test("register state on connected store with init as a function", () => {
  const App = () => <State>{state => <div>{state.value}</div>}</State>;

  const { asFragment, getByText } = render(<App />);

  const dom = asFragment();
  register({
    state: ({ set }) => ({ value: 1 })
  });
  const dom2 = asFragment();

  expect(dom).toMatchDiffSnapshot(dom2);
  deleteStore();
});

test("register state on connected store", () => {
  const App = () => <State>{state => <div>{state.value}</div>}</State>;

  const { asFragment, getByText } = render(<App />);

  const dom = asFragment();
  register({ state: { value: 1 } });
  const dom2 = asFragment();

  expect(dom).toMatchDiffSnapshot(dom2);
  deleteStore();
});

test("path default value", () => {
  register({
    state: ({ set }) => ({
      more: {
        stuff: {
          list: [{ item: "one" }, { item: "two" }]
        }
      }
    })
  });

  const App = () => (
    <State path="more.stuff.list[2].item" default="defaultValue">
      {item => {
        return <div>{item}</div>;
      }}
    </State>
  );

  const { asFragment, getByText } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

test("custom plugin", () => {
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

  const store = {
    state: ({ set, get }) => ({
      counter: 0,
      inc: () => set(state => void state.counter++, "Decrement"),
      dec: () => set(state => void state.counter--, "Increment")
    })
  };

  register(store);
  register(plugin);

  const App = () => (
    <State>
      {({ counter, inc, dec }) => (
        <Fragment>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
        </Fragment>
      )}
    </State>
  );

  expect(pluginDispatchCalled).toEqual(0);
  const { asFragment, getByText } = render(<App />);
  expect(pluginDispatchCalled).toEqual(2);
  let dom = asFragment();

  function clickDiff(text) {
    fireEvent.click(getByText(text));
    const nextDom = asFragment();
    expect(dom).toMatchDiffSnapshot(nextDom);
    dom = nextDom;
  }

  clickDiff("+");
  expect(pluginDispatchCalled).toEqual(4);
  clickDiff("-");
  expect(pluginDispatchCalled).toEqual(6);
  clickDiff("+");
  expect(pluginDispatchCalled).toEqual(8);
  clickDiff("-");
  expect(pluginDispatchCalled).toEqual(10);
  deleteStore();
});

//xxtest("plugin can have array of set middleware", () => {
////throw new Error("not implemented");
//});

//xxtest("custom namespaced module", () => {
////throw new Error("not implemented");
//});
