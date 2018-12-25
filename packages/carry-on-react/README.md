# carry-on-react

State manager for React. Requires [Proxy](https://caniuse.com/#feat=proxy).

# Features

- Mutate state directly
- No selector necessary
- Batch update only changed components
- Multiple stores
- `State` component or `withState` higher order component
- Middleware
- Optional form handling: [carry-on-react-forms](../carry-on-react-forms)
- Flexible `State` properties: `debounce, throttle, constant, strict, select, path, from`

### Import
```JavaScript
import { State, withState, register } from "carry-on-react";
```


# `register({ `*`state`*`, `*`middleware`*`, `*`priority`*` }, `*`id`*`)`

|Parameter|Description|
|---|---|---|
|`state`|Function or object that represents the state to register|
|`middleware`|Function that acts as middleware wrapped around an action|
|`priority`|State is registered in a random order unless a priority is specified.  Higher priority state is registered first.|
|`id`|The name of the store to register state in.|

 # Registering *`state`*:

The *`set`* function is used to change state and the *`get`* function to retrieve state.
|Function|Description|
|---|---|
|`set(state => {}, `*`type`*`)`|Calls a function that mutates the passed state.  Optionally specify a string `type` to display when viewing state changes in Dev Tools.|
|`get(state => {})`|Calls a function that queries the passed state and returns the result.|


```JavaScript
const state = ({ get, set }) => ({
	field: "value",
	change(val) {
		set(state => {
			state.field = val;
		}, "Change Value");
	},
	isIt(val) {
		return get(({ field }) => field === val);
	}
});

register({ state });
```



When *`register`* is called multiple times it merges state, potentially into a running store:

```JavaScript
register({
	state: {
	  field1: "value1"
	}
});

register({
	state: {
	  field2: "value2"
	}
});

// The store's state will look like:
//{
//	field1: "value1",
//	field2: "value2"
//}
```



Use multiple stores with the *`id`* parameter:
```JavaScript
const state = {
	field1: "value1"
};

register({ state }, "store1");
register({ state }, "store2");
```

# `<State ...>`

All properties are optional.
|Property|Description|
|---|---|
|`render` or `children` | The render function.  This function will be called with the state as it's first parameter.|
|`from`|What store to retrieve state from.|
|`path`|The state path to retrieve.  Specified as a dotted path string, with support for arrays.  Sample: `"my.field.path[10].name"`|
|`select`|A function that selects the required state.|
|`constant`| When true, the `State` component will query state and render only once.|
|`strict`| When true, the `State` will track accessed keys on every update instead of on just the first one.|
|`default`|The default value when the state is undefined.|
|`throttle`|Milliseconds to throttle change requests|
|`debounce`|Milliseconds to debounce change requests|
|`debug`|When true, log messages regarding state changes will be printed to the `console`.|
|`verbose`|When true, verbose log messages are printed to the `console`.|
|`id`|Debug log uses this to identify components|

# Using `State`:

Accessing state is done using the State component:

```JavaScript
register({
  state: ({ set }) => ({
    counter: 0,
    inc: () => set(state => { state.counter++; }),
    dec: () => set(state => { state.counter--; })
  })
});

const App = () => (
  <State>
    {state => (
      <>
        <div>Counter: {state.counter}</div>
        <button onClick={state.inc}>+</button>
        <button onClick={state.dec}>-</button>
      </>
    )}
  </State>
);
```

Using `debug` and `verbose` can help find problems:
```JavaScript
register({
  state: ({ set }) => ({
    counter: 0,
    inc: () => set(state => { state.counter++; }),
    dec: () => set(state => { state.counter--; })
  })
});

const App = () => (
  <State debug verbose>
    {state => (
      <>
        <div>Counter: {state.counter}</div>
        <button onClick={state.inc}>+</button>
        <button onClick={state.dec}>-</button>
      </>
    )}
  </State>
);
```

Enabling `debug` and `verbose` on all State components:

```JavaScript
register({
  state: ({ set }) => ({
    counter: 0,
    inc: () => set(state => { state.counter++; }),
    dec: () => set(state => { state.counter--; })
  })
});

State.Debug = true;
State.Verbose = true;

const App = () => (
  <State>
    {state => (
      <>
        <div>Counter: {state.counter}</div>
        <button onClick={state.inc}>+</button>
        <button onClick={state.dec}>-</button>
      </>
    )}
  </State>
);
```

# Redux Dev Tools Extension

The store can be viewed and time traveled using [Redux Dev Tools Extension](https://github.com/zalmoxisus/redux-devtools-extension):

```JavaScript
import { register, State, devTools } from "carry-on-react";

register(devTools());

register({
  state: ({ set }) => ({
    counter: 0,
    inc: () => set(state => { state.counter++; }),
    dec: () => set(state => { state.counter--; })
  })
});

const App = () => (
  <State>
    {state => (
      <>
        <div>Counter: {state.counter}</div>
        <button onClick={state.inc}>+</button>
        <button onClick={state.dec}>-</button>
      </>
    )}
  </State>
);
```

# Store functions
These functions generally are not necessary, but may be useful in certain situations.

|Function|Description|
|---|---|
|`initStores()`|Delete all stores.  Useful in hot reload situations when you need to reset the store on a reload.|
|`useStore(`*`id`*`)`|Get the store object|
|`deleteStore(`*`id`*`)`|Delete a store|
|`subscribe(id, fn)`|Subscribe to state changes. `fn` signature is `(state, changes) => { ... }`  Returns an `unsubscribe` function.|

# License
MIT

# Design notes

## Why?
Try to make state easier to reason about.

## Why Proxy?

`carry-on` focuses on a front-end use case where Proxy is fast enough.


## Why optional selectors?

***No selector is necessary due to change and access tracking.***  When the `State` component is rendered, a Proxy is created which tracks state value accesses and creates an an index of which state changes the component should re-render for.  The access tracking index is created only the first time a component is rendered unless the `strict` property is specified.

## Actions in state?
Keeping actions close to it's affected state makes it easier to reason about state changes.



## Examples

### Default store

```JavaScript
register({
  state: ({ set }) => ({
    counter: 0,
    inc: () => set(state => void state.counter++),
    dec: () => set(state => void state.counter--)
  })
});

const App = () => (
  <State>
    {state => (
      <>
        <div>Counter: {state.counter}</div>
        <button onClick={state.inc}>+</button>
        <button onClick={state.dec}>-</button>
      </>
    )}
  </State>
);
```

### Two named stores

```JavaScript
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
      {state => (
        <div>
          <div>Counter: {state.counter}</div>
          <button onClick={state.inc}>+</button>
          <button onClick={state.dec}>-</button>
        </div>
      )}
    </State>
    <State from="store2">
      {({ counter, inc, dec }) => (
        <div>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
        </div>
      )}
    </State>
  </>
);
```

### State select

```JavaScript
register({
  state: ({ set }) => ({
    notSelected: "item",
    counter: 0,
    inc: () => set(state => void state.counter++),
    dec: () => set(state => void state.counter--)
  })
});

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
```

### Register state

```JavaScript
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
```

### Register state on a named store

```JavaScript
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
```

### State path

```JavaScript
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
```

### State path with default

```JavaScript
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
```

### State path on a named store using from

```JavaScript
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
);
```

### Unit of work using get

```JavaScript
let rslt, rslt2;
register({
  state: ({ get, set }) => ({
    action() {
      // use get for a unit of work
      rslt = get(state => {
        // do stuff with state
        state.new = { ok: "0" };
      });

      rslt2 = get(state => {
        // do some other stuff with state
        state.other = { none: "thing" };
      });

      // rslt and rslt2 are now two different versions of the original state
      return set(state => {
        state.done = "yes";
      });
    }
  })
});

const App = () => (
  <State>
    {({ action, done }) => (
      <div>
        <span>{done}</span>
        <button onClick={action}>run action</button>
      </div>
    )}
  </State>
);
```

### Multiple select

```JavaScript
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
```
