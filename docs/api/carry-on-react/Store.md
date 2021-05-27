---
id: Store
title: <Store>
---

Specify a store that child components will use.

## Properties

| Property | Description  |
| -------- | ------------ |
| `id`     | The store ID |

```js live noInline
import { State } from "carry-on-react";
import { register } from "carry-on-store";

const storeId = "getStarted";

register(storeId, {
  state: ({ set }) => ({
    counter: 0,
    inc: () =>
      set(state => {
        state.counter += 1;
      }),
    dec: () =>
      set(state => {
        state.counter -= 1;
      })
  })
});

render(
  <Store id={storeId}>
    <State>
      {({ counter, inc, dec }) => (
        <>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
          <StateInspector from={storeId} />
        </>
      )}
    </State>
  </Store>
);
```
