# carry-on-react

State manager for React.

## Features

- Uses pub/sub mechanics instead of React.Context tree walking updates
- Minimal boilerplate
- Multiple stores, multiple namespaces
- Custom plugins that can provide additional state, actions, and middleware
- Store and State components to help keep your components stateless
- Throttle or debounce state changes to avoid stalling your ui
- Optionally use [immer](https://github.com/mweststrate/immer) to mutate state naturally instead of rolling your own immutable state.
- Optional form handling plugin, [carry-on-react-forms](../carry-on-react-forms)

## Import

```JavaScript
import { State, Store, withState, withStore, register, deleteStore } from "carry-on-react";
```

## Examples

### Default store
```JavaScript
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
          <div>
            <div>Counter: {counter}</div>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
          </div>
        )}
      </State>
    </Store>
);
```

### Two named stores
```JavaScript
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
  <>
    <Store id="store1" init={store}>
      <State from="store1">
        {({ counter, inc, dec }) => (
          <div>
            <div>Counter: {counter}</div>
            <button onClick={inc}>store1 +</button>
            <button onClick={dec}>store1 -</button>
          </div>
        )}
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
  </>
);
```

### State select
```JavaScript
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
```

### Register state
```JavaScript
register(
  {
    state: ({ dispatch }) => ({
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
    })
  }
);

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
```

### Register state on a named store
```JavaScript
register(
  {
    state: ({ dispatch }) => ({
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
    })
  },
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
```

### Immer as producer
```JavaScript
const store = ({ dispatch }) => ({
  counter: 0,
  inc() {
    return dispatch(state => void state.counter++);
  },
  dec() {
    return dispatch(state => void state.counter--);
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
```

### State path
```JavaScript
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
```

### State path on a named store using from
```JavaScript
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
```

### Unit of work using query and immer
```JavaScript
import immer from "immer";

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
    
    // rslt and rslt2 are now two different versions of the original state
  }
});

const App = () => (
  <Store init={store} producer={immer}>
    <State>
      {({ action }) => (
        <div>
          <button onClick={action}>run action</button>
        </div>
      )}
    </State>
  </Store>
);
```

### Multiple select
```JavaScript
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

const selectCounter = ({ counter }) => counter;
const selectActions = ({ inc, dec }) => ({ inc, dec });

const App = props => (
  <Store init={store}>
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
  </Store>
);
```

### Memoized selects (you provide memoization function)
```JavaScript
import memoize from "memoize-state";

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
```

### Commit/Rollback with carry-on-transaction plugin
```JavaScript
import transaction from "carry-on-transaction";

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
    query(state => state.begin());
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


```

### Notify listeners plugin (subscribe/unsubscribe)
```JavaScript
import { notify } from "carry-on-store";

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
const notifyListeners = notify();
const unsubscribe = notifyListeners.subscribe(state => {
  marker += 1;
});

const App = () => (
  <Store init={store} plugins={notifyListeners.plugin}>
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
```

### Path default value
```JavaScript
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
```

### Custom plugin
```JavaScript
let pluginDispatchCalled = 0;

const plugin = {
  state: ({ dispatch }) => ({
    thing: 1,
    pluginFn() {
      return dispatch(state => ({
        ...state,
        thing: state.thing + 1
      }));
    }
  }),
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
```

### Custom plugin using register
```JavaScript
let pluginDispatchCalled = 0;

const plugin = {
  state: ({ dispatch }) => ({
    thing: 1,
    pluginFn() {
      return dispatch(state => ({
        ...state,
        thing: state.thing + 1
      }));
    }
  }),
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

register(plugin);

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
```
