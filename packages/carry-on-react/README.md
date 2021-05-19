# carry-on-react

State container for React. Requires [Proxy](https://caniuse.com/#feat=proxy).

Read the documentation at: https://dfadev.github.io/carry-on

# Features

- Mutate state directly
- No selector necessary
- Batch update only changed components
- Multiple stores
- `State` component or `withState` higher order component
- Middleware
- Optional form handling: [carry-on-react-forms](../carry-on-react-forms)
- Flexible `State` properties: `debounce, throttle, constant, strict, select, path, from`

## Install

```JavaScript
npm install --save carry-on-react
```

## Import

```JavaScript
import { State, register } from "carry-on-react";
```

## Simple store

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
      <div>
        <div>Counter: {state.counter}</div>
        <button onClick={state.inc}>+</button>
        <button onClick={state.dec}>-</button>
      </div>
    )}
  </State>
);
```
