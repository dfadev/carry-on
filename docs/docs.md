---
id: index
title: Getting Started
---

## Install

```JavaScript
npm install --save carry-on-react
```

## Import

```JavaScript
import { State } from "carry-on-react";
import { register } from "carry-on-store";
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
