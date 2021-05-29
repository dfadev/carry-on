---
id: composingState
title: Composing State
---

Instead of specifying `State` properties you can compose them as sibling nodes.

Allowed components are:

| Component | Maps To Prop | Gets Value From Prop | Default value when present |
| --------- | ------------ | -------------------- | -------------------------- |
| Id        | id           | children             |
| Render    | render       | children             |
| Register  | register     | children             |
| OnMount   | onMount      | children             |
| OnUnmount | onUnmount    | children             |
| Select    | select       | children             |
| Path      | path         | children             |
| Default   | default      | children             |
| Throttle  | throttle     | ms                   | 0                          |
| Debounce  | debounce     | ms                   | 0                          |
| Constant  | constant     | children             | true                       |
| Strict    | strict       | children             | true                       |
| Debug     | debug        | enabled              | true                       |
| Verbose   | verbose      | enabled              | true                       |

```js live noInline
import { Store, State, Register, Render } from "carry-on-react";

render(
  <Store id={"getStarted"}>
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

`Register` can be specified multiple times.

```js live noInline
import { Store, State, Register, Render } from "carry-on-react";

render(
  <Store id={"getStarted2"}>
    <State>
      <Register>{{ state: { counter: 0 } }}</Register>
      <Register>
        {({ set }) => ({
          inc: () =>
            set(state => {
              state.counter += 1;
            })
        })}
      </Register>
      <Register>
        {({ set }) => ({
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
