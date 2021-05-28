---
id: gettingStarted
slug: /
title: Getting Started
---

## Install

```bash

npm install --save carry-on-store carry-on-react

```

## Simple store

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

## Composing

```js live noInline
import { Store, State, Register, Render } from "carry-on-react";

render(
  <Store id={"getStartedComposing"}>
    <State>
      <Register>
        {({ set }) => ({
          counter: 0,
          inc: () =>
            set(state => {
              state.counter += 1;
            }),
          dec: () =>
            set(state => {
              state.counter -= 1;
            })
        })}
      </Register>
      <Render>
        {({ counter, inc, dec }) => (
          <>
            <div>Counter: {counter}</div>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
            <StateInspector />
          </>
        )}
      </Render>
    </State>
  </Store>
);
```
