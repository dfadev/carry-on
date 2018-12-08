/** @format **/
import React, { Fragment } from "react";
import notifyListeners from "carry-on-notify";
import transaction from "carry-on-transaction";
import { deleteStore, register, State, Store } from "../src";
import { wait, render, fireEvent, waitForElement } from "react-testing-library";
import immer from "immer";
import memoize from "memoize-state";

// default store
test("default store", () => {
  const store = ({ dispatch }) => ({
    counter: 0,
    inc() {
      return dispatch(state => ({
        ...state,
        counter: state.counter + 1
      }));
    },
    dec() {
      return dispatch(state => ({
        ...state,
        counter: state.counter - 1
      }));
    }
  });

  const App = () => (
    <Store init={store}>
      <State>
        {({ counter, inc, dec }) => (
          <Fragment>
            <div>Counter: {counter}</div>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
          </Fragment>
        )}
      </State>
    </Store>
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

// two named stores
test("two named stores", () => {
  const store = ({ dispatch }) => ({
    counter: 0,
    inc() {
      return dispatch(state => ({
        ...state,
        counter: state.counter + 1
      }));
    },
    dec() {
      return dispatch(state => ({
        ...state,
        counter: state.counter - 1
      }));
    }
  });

  const App = () => (
    <Fragment>
      <Store id="store1" init={store}>
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
      </Store>
      <Store id="store2" init={store}>
        <State from="store2">
          {({ counter, inc, dec }) => (
            <div>
              <div>Counter: {counter}</div>
              <button onClick={inc}>store2 +</button>
              <button onClick={dec}>store2 -</button>
            </div>
          )}
        </State>
      </Store>
    </Fragment>
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
  const store = ({ dispatch }) => ({
    notSelected: "item",
    counter: 0,
    inc() {
      return dispatch(state => ({
        ...state,
        counter: state.counter + 1
      }));
    },
    dec() {
      return dispatch(state => ({
        ...state,
        counter: state.counter - 1
      }));
    }
  });

  const select = ({ counter, inc, dec }) => ({ counter, inc, dec });

  const App = props => (
    <Store init={store}>
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
    </Store>
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

// query
test("query", () => {
  let marker = 0;

  const store = ({ dispatch, query }) => ({
    log(msg) {
      query(state => {
        marker++;
        return {
          ...state,
          counter: 9999
        };
      });
    },
    counter: 0,
    inc() {
      return dispatch(state => ({
        ...state,
        counter: state.counter + 1
      }));
    },
    dec() {
      return dispatch(state => ({
        ...state,
        counter: state.counter - 1
      }));
    }
  });

  const App = () => (
    <Store init={store}>
      <State>
        {({ counter, inc, dec, log }) => (
          <Fragment>
            <div>Counter: {counter}</div>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
            <button onClick={log}>log</button>
          </Fragment>
        )}
      </State>
    </Store>
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
  register(({ dispatch }) => ({
    counter: 0,
    inc() {
      return dispatch(state => ({
        ...state,
        counter: state.counter + 1
      }));
    },
    dec() {
      return dispatch(state => ({
        ...state,
        counter: state.counter - 1
      }));
    }
  }));

  const App = () => (
    <Store>
      <State>
        {({ counter, inc, dec }) => (
          <Fragment>
            <div>Counter: {counter}</div>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
          </Fragment>
        )}
      </State>
    </Store>
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
    ({ dispatch }) => ({
      counter: 0,
      inc() {
        return dispatch(state => ({
          ...state,
          counter: state.counter + 1
        }));
      },
      dec() {
        return dispatch(state => ({
          ...state,
          counter: state.counter - 1
        }));
      }
    }),
    "store1"
  );

  const App = () => (
    <Store id="store1">
      <State from="store1">
        {({ counter, inc, dec }) => (
          <Fragment>
            <div>Counter: {counter}</div>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
          </Fragment>
        )}
      </State>
    </Store>
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
  const state = ({ dispatch }) => ({
    counter: 0,
    inc() {
      return dispatch(state => ({
        ...state,
        counter: state.counter + 1
      }));
    },
    dec() {
      return dispatch(state => ({
        ...state,
        counter: state.counter - 1
      }));
    }
  });

  register(() => {
    return { extraVal: "ok" };
  });

  const App = () => (
    <Store init={state}>
      <State>
        {({ counter, inc, dec, extraVal }) => (
          <Fragment>
            <div>{extraVal}</div>
            <div>Counter: {counter}</div>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
          </Fragment>
        )}
      </State>
    </Store>
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

// immer as producer
test("immer as producer", () => {
  const store = ({ dispatch }) => ({
    counter: 0,
    inc() {
      dispatch(state => void state.counter++);
    },
    dec() {
      dispatch(state => void state.counter--);
    }
  });

  const App = () => (
    <Store init={store} producer={immer}>
      <State>
        {({ counter, inc, dec }) => (
          <Fragment>
            <div>Counter: {counter}</div>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
          </Fragment>
        )}
      </State>
    </Store>
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

// path
test("path", () => {
  const store = ({ dispatch }) => ({
    more: {
      stuff: {
        list: [{ item: "one" }, { item: "two" }]
      }
    }
  });

  const App = () => (
    <Store init={store}>
      <State path="more.stuff.list[0].item">
        {item => {
          return <div>{item}</div>;
        }}
      </State>
    </Store>
  );

  const { asFragment, getByText } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

test("path2", () => {
  const store = ({ dispatch }) => ({
    more: {
      stuff: {
        list: [{ item: "one" }, { item: "two" }]
      }
    }
  });

  const App = () => (
    <Store init={store}>
      <State path=".more.stuff.list[0].item" default="ok">
        {item => {
          return <div>{item}</div>;
        }}
      </State>
    </Store>
  );

  const { asFragment, getByText } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

// from and path
test("from and path", () => {
  const store = ({ dispatch }) => ({
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
  });

  const App = () => (
    <Store init={store} id="store1">
      <State from="store1" path="more.stuff.list[0].item">
        {item => <div>{item}</div>}
      </State>
    </Store>
  );

  const { asFragment, getByText } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore("store1");
});

// unit of work with query and immer
test("unit of work with query and immer", async () => {
  let rslt, rslt2;
  const store = ({ dispatch, query }) => ({
    action() {
      // use query with immer producer for a unit of work
      rslt = query(state => {
        // do stuff with state
        state.new = { ok: "0" };
      });

      rslt2 = query(state => {
        // do some other stuff with state
        state.other = { none: "thing" };
      });

      return dispatch(state => {
        state.done = "yes";
      });
    }
  });

  const App = () => (
    <Store init={store} producer={immer}>
      <State>
        {({ action, done }) => (
          <div>
            <span>{done}</span>
            <button onClick={action}>run action</button>
          </div>
        )}
      </State>
    </Store>
  );

  const { asFragment, getByText } = render(<App />);

  let dom = asFragment();

  function clickDiff(text) {
    fireEvent.click(getByText(text));
    const nextDom = asFragment();
    expect(dom).toMatchDiffSnapshot(nextDom);
    dom = nextDom;
  }

  clickDiff("run action");
  expect(rslt.new.ok).toEqual("0");
  expect(rslt2.other.none).toEqual("thing");
  deleteStore();
});

// multiple select
test("multiple select", () => {
  const store = ({ dispatch }) => ({
    counter: 0,
    inc() {
      dispatch(state => ({
        ...state,
        counter: state.counter + 1
      }));
    },
    dec() {
      dispatch(state => ({
        ...state,
        counter: state.counter - 1
      }));
    }
  });

  const selectCounter = ({ counter }) => counter;
  const selectActions = ({ inc, dec }) => ({ inc, dec });

  const App = props => (
    <Store init={store}>
      <div>
        <State select={selectCounter}>
          {counter => (
            <Fragment>
              <div>Counter: {counter}</div>
              <State select={selectActions}>
                {({ inc, dec }) => (
                  <Fragment>
                    <button onClick={inc}>+</button>
                    <button onClick={dec}>-</button>
                  </Fragment>
                )}
              </State>
            </Fragment>
          )}
        </State>
      </div>
    </Store>
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

// multiple memoized select

test("multiple memoized select", () => {
  const store = ({ dispatch }) => ({
    counter: 0,
    inc() {
      return dispatch(state => ({
        ...state,
        counter: state.counter + 1
      }));
    },
    dec() {
      return dispatch(state => ({
        ...state,
        counter: state.counter - 1
      }));
    }
  });

  const selectCounter = memoize(({ counter }) => counter);
  const selectActions = memoize(({ inc, dec }) => ({ inc, dec }));

  const App = props => (
    <Store init={store}>
      <div>
        <State select={selectCounter}>
          {counter => (
            <Fragment>
              <div>Counter: {counter}</div>
              <State select={selectActions}>
                {({ inc, dec }) => (
                  <Fragment>
                    <button onClick={inc}>+</button>
                    <button onClick={dec}>-</button>
                  </Fragment>
                )}
              </State>
            </Fragment>
          )}
        </State>
      </div>
    </Store>
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

  const store = ({ dispatch, query, state }) => {
    const inc = () =>
      dispatch(
        state => ({
          ...state,
          counter: state.counter + 1
        }),
        "Increment"
      );

    const dec = () =>
      dispatch(
        state => ({
          ...state,
          counter: state.counter - 1
        }),
        "Decrement"
      );

    function beginClick(msg) {
      // start transaction
      state.begin();
    }

    function commitClick() {
      const before = query();
      try {
        const after = state.commit();
      } catch (e) {
        commitException += 1;
      }
      commits++;
    }

    function rollbackClick() {
      const before = query();
      try {
        const after = state.rollback();
      } catch (e) {
        rollbackException += 1;
      }
      rollbacks++;
    }

    return {
      counter: 0,
      inc,
      dec,
      beginClick,
      commitClick,
      rollbackClick
    };
  };

  const App = () => (
    <Store init={store} plugins={[transaction()]}>
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
    </Store>
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
  const store = ({ dispatch }) => {
    const inc = () =>
      dispatch(
        state => ({
          ...state,
          counter: state.counter + 1
        }),
        "Increment"
      );

    const dec = () =>
      dispatch(
        state => ({
          ...state,
          counter: state.counter - 1
        }),
        "Decrement"
      );

    return {
      counter: 0,
      inc,
      dec
    };
  };

  let marker = 0;
  const notify = notifyListeners();
  const unsubscribe = notify.subscribe(state => {
    marker = 1;
  });

  const App = () => (
    <Store init={store} plugins={notify.plugin}>
      <State>
        {({ counter, inc, dec }) => (
          <Fragment>
            <div>Counter: {counter}</div>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
          </Fragment>
        )}
      </State>
    </Store>
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
  const store = ({ dispatch }) => ({
    counter: 0,
    inc() {
      return dispatch(state => ({
        ...state,
        counter: state.counter + 1
      }));
    },
    dec() {
      return dispatch(state => ({
        ...state,
        counter: state.counter - 1
      }));
    }
  });

  const App = () => (
    <Store init={store}>
      <State />
      <State>{null}</State>
    </Store>
  );

  const { asFragment, getByText } = render(<App />);
  let dom = asFragment();
  expect(dom).toMatchSnapshot();
  deleteStore();
});

test("duplicate store throws", () => {
  const App = () => (
    <Fragment>
      <Store />
      <Store />
    </Fragment>
  );

  const prev = console.error;
  console.error = () => {};
  let gotException = 0;
  try {
    render(<App />);
  } catch (e) {
    gotException++;
  }
  expect(gotException).toBe(1);
  console.error = prev;
  deleteStore();
});

test("duplicate named store throws", () => {
  const App = () => (
    <Fragment>
      <Store id="store1" />
      <Store id="store1" />
    </Fragment>
  );

  const prev = console.error;
  console.error = () => {};
  let gotException = 0;
  try {
    render(<App />);
  } catch (e) {
    gotException++;
  }
  expect(gotException).toBe(1);
  console.error = prev;
  deleteStore("store1");
  deleteStore("store2");
});

test("register state on connected store with init as a function", () => {
  const App = () => (
    <Store init={{}}>
      <State>{state => <div>{state.value}</div>}</State>
    </Store>
  );

  const { asFragment, getByText } = render(<App />);

  const dom = asFragment();
  register(({ dispatch }) => ({ value: 1 }));
  const dom2 = asFragment();

  expect(dom).toMatchDiffSnapshot(dom2);
  deleteStore();
});

test("register state on connected store", () => {
  const App = () => (
    <Store init={{}}>
      <State>{state => <div>{state.value}</div>}</State>
    </Store>
  );

  const { asFragment, getByText } = render(<App />);

  const dom = asFragment();
  register({ value: 1 });
  const dom2 = asFragment();

  expect(dom).toMatchDiffSnapshot(dom2);
  deleteStore();
});

test("path default value", () => {
  const store = ({ dispatch }) => ({
    more: {
      stuff: {
        list: [{ item: "one" }, { item: "two" }]
      }
    }
  });

  const App = () => (
    <Store init={store}>
      <State path="more.stuff.list[2].item" default="defaultValue">
        {item => {
          return <div>{item}</div>;
        }}
      </State>
    </Store>
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

  const store = ({ dispatch }) => ({
    counter: 0,
    inc() {
      return dispatch(state => ({
        ...state,
        counter: state.counter + 1
      }));
    },
    dec() {
      return dispatch(state => ({
        ...state,
        counter: state.counter - 1
      }));
    }
  });

  const App = () => (
    <Store init={store} plugins={plugin}>
      <State>
        {({ counter, inc, dec }) => (
          <Fragment>
            <div>Counter: {counter}</div>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
          </Fragment>
        )}
      </State>
    </Store>
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

//xtest("plugin can have array of dispatch middleware", () => {
////throw new Error("not implemented");
//});

//xtest("custom namespaced module", () => {
////throw new Error("not implemented");
//});
