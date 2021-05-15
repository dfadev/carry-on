---
id: index
slug: /
title: Getting Started
---

## Install

```bash

npm install --save carry-on-store carry-on-react

```

## Import

```js
import { State } from "carry-on-react";
import { register } from "carry-on-store";
```

## Simple store

```js live noInline
const storeId = "getStarted";

register(storeId, {
  state: ({ set }) => ({
    counter: 0,
    inc: () => set(state => { state.counter++; }),
    dec: () => set(state => { state.counter--; })
  })
});

const App = () => (
  <>
    <State from={storeId}>
      {state => (
        <div>
          <div>Counter: {state.counter}</div>
          <button onClick={state.inc}>+</button>
          <button onClick={state.dec}>-</button>
        </div>
      )}
    </State>
    <State from={storeId} select={s => ({ ...s })}>
      {state => <Inspector data={state} expandLevel={2} />}
    </State>
  </>
);

render(<App />);
```
