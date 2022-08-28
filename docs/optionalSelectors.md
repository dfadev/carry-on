---
id: optionalSelectors
title: Selectors
---

Selectors are not necessary because state field access is tracked by a `Proxy` wrapper. A selector can optionally be specified using the `select` attribute.

### Register some state

```js live noInline
const storeId = "selectors";

state(storeId, ({ set }) => ({
  counter: 0,
  inc: () =>
    set(state => {
      state.counter += 1;
    }),
  dec: () =>
    set(state => {
      state.counter -= 1;
    })
}));

render(<StateInspector from={storeId} />);
```

### Access state without a selector:

```js live noInline
const storeId = "selectors";

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

### Access state with a selector

```js live noInline
const storeId = "selectors";

render(
  <State
    from={storeId}
    select={({ counter, inc, dec }) => ({ counter, inc, dec })}
  >
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
