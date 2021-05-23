---
id: actionsAreFunctions
title: Actions are Functions
---

An action function mutates state and is stored as part of the state it mutates.

The state an action function modifies must be modified by code executing inside a call to the `set` function provided by the store when registering state.

```jsx live noInline
import { register } from "carry-on-store";
import { State } from "carry-on-react";

const storeId = "actionsAreFunctions";

register(storeId, {
  // "get" and "set" functions are provided by store
  state: ({ get, set }) => ({
    counter: 0,
    // action functions:
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

render(
  <State from={storeId}>
    {({ counter, inc, dec }) => (
      <>
        <div>Counter: {counter}</div>
        <button onClick={inc}>+</button>
        <button onClick={dec}>-</button>
        <StateInspector from={storeId} />
      </>
    )}
  </State>
);
```
