---
id: State
title: <State>
---

## Properties

All properties are optional.

| Property               | Description                                                                                                                |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `render` or `children` | The render function. This function will be called with the state as it's first parameter.                                  |
| `from`                 | What store to retrieve state from.                                                                                         |
| `path`                 | The state path to retrieve. Specified as a dotted path string, with support for arrays. Sample: `"my.field.path[10].name"` |
| `select`               | A function that selects the required state.                                                                                |
| `constant`             | When true, the `State` component will query state and render only once.                                                    |
| `strict`               | When true, the `State` component will track accessed keys on every update instead of on just the first one.                          |
| `default`              | The default value when the state is undefined.                                                                             |
| `throttle`             | Milliseconds to throttle change requests                                                                                   |
| `debounce`             | Milliseconds to debounce change requests                                                                                   |
| `debug`                | When true, log messages regarding state changes will be printed to the `console`.                                          |
| `verbose`              | When true, verbose log messages are printed to the `console`.                                                              |
| `id`                   | Debug log uses this to identify components                                                                                 |
| `onMount`              | Called with the current state when the component mounts.                                                                   |
| `onUnmount`            | Called with the current state when the component unmounts.                                                                 |

## Accessing

Accessing state is done using the State component:

```js
register({
  state: ({ set }) => ({
    counter: 0,
    inc: () =>
      set(state => {
        state.counter++;
      }),
    dec: () =>
      set(state => {
        state.counter--;
      })
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

## Debugging

Using `debug` and `verbose` can help find problems:

```js
register({
  state: ({ set }) => ({
    counter: 0,
    inc: () =>
      set(state => {
        state.counter++;
      }),
    dec: () =>
      set(state => {
        state.counter--;
      })
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

```js
register({
  state: ({ set }) => ({
    counter: 0,
    inc: () =>
      set(state => {
        state.counter++;
      }),
    dec: () =>
      set(state => {
        state.counter--;
      })
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
