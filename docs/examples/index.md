---
id: index
slug: /examples/
title: Examples
---
## Default store

```js live noInline
register({
  state: ({ set }) => ({
    counter: 0,
    inc: () => set(state => void state.counter++),
    dec: () => set(state => void state.counter--)
  })
});

render(
  <>
    <State>
      {state => (
        <>
          <div>Counter: {state.counter}</div>
          <button onClick={state.inc}>+</button>
          <button onClick={state.dec}>-</button>
        </>
      )}
    </State>
    <StateInspector />
  </>
);
```

## Two named stores

```js live noInline
const state = {
  state: ({ set }) => ({
    counter: 0,
    inc: () => set(state => void state.counter++),
    dec: () => set(state => void state.counter--)
  })
};

register("store1", state);
register("store2", state);

render(
  <>
    hello <Q>{s => s.name}</Q>
    hello <Q s={s => s.name}/>
    hello !!name
    <State from="store1">
      {state => (
        <div>
          <h4>Store 1</h4>
          <div>Counter: {state.counter}</div>
          <button onClick={state.inc}>+</button>
          <button onClick={state.dec}>-</button>
        </div>
      )}
    </State>
    <StateInspector from="store1" />

    <State from="store2">
      {({ counter, inc, dec }) => (
        <div>
          <h4>Store 2</h4>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
        </div>
      )}
    </State>
    <StateInspector from="store2" />
  </>
);
```

## State select

```js live noInline
const storeId = "stateSelect";

register(storeId, {
  state: ({ set }) => ({
    notSelected: "item",
    counter: 0,
    inc: () => set(state => void state.counter++),
    dec: () => set(state => void state.counter--)
  })
});

const select = ({ counter, inc, dec }) => ({ counter, inc, dec });

render(
  <>
    <State from={storeId} select={select}>
      {({ counter, inc, dec, notSelected }) => (
        <div>
          <div>
            notSelected is undefined? {notSelected === undefined ? "yes" : "no"}
          </div>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
        </div>
      )}
    </State>
    <StateInspector from={storeId} />
  </>
);
```

## Register state

```js live noInline
const storeId = "registerState";

register(storeId, {
  state: ({ set }) => ({
    counter: 0,
    inc: () => set(state => void state.counter++),
    dec: () => set(state => void state.counter--)
  })
});

render(
  <>
    <State from={storeId}>
      {({ counter, inc, dec }) => (
        <>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
        </>
      )}
    </State>
    <StateInspector from={storeId} />
  </>
);
```

## Register state on a named store

```js live noInline
const storeId = "store1";

register(storeId, {
  state: ({ set }) => ({
    counter: 0,
    inc: () => set(state => void state.counter++),
    dec: () => set(state => void state.counter--)
  })
});

render(
  <>
    <State from={storeId}>
      {({ counter, inc, dec }) => (
        <>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
        </>
      )}
    </State>
    <StateInspector from={storeId} />
  </>
);
```

## State path

```js live noInline
const storeId = "statePath";

register(storeId, {
  state: ({ set }) => ({
    more: {
      stuff: {
        list: [{ item: "one" }, { item: "two" }]
      }
    }
  })
});

render(
  <>
    <State from={storeId} path="more.stuff.list[0].item">
      {item => {
        return <div>{item}</div>;
      }}
    </State>
    <StateInspector from={storeId} />
  </>
);
```

## State path with default

```js live noInline
const storeId = "statePathDefault";

register(storeId, {
  state: ({ set }) => ({
    more: {
      stuff: {
        list: [{ item: "one" }, { item: "two" }]
      }
    }
  })
});

render(
  <>
    <State from={storeId} path="oops.more.stuff.list[0].item" default="ok">
      {item => {
        return <div>{item}</div>;
      }}
    </State>
    <StateInspector from={storeId} />
  </>
);
```

## State path on a named store using from

```js live noInline
const storeId = "statePathNamedStore";

register(storeId, {
  state: ({ set }) => ({
    more: {
      stuff: {
        list: [{ item: "one" }, { item: "two" }]
      }
    }
  })
});

render(
  <>
    <State from={storeId} path="more.stuff.list[0].item">
      {item => <div>{item}</div>}
    </State>
    <StateInspector from={storeId} />
  </>
);
```

## Multiple select

```js live noInline
const storeId = "multipleSelect";

register(storeId, {
  state: ({ set }) => ({
    counter: 0,
    inc: () => set(state => void state.counter++),
    dec: () => set(state => void state.counter--)
  })
});

const selectCounter = ({ counter }) => counter;
const selectActions = ({ inc, dec }) => ({ inc, dec });

render(
  <div>
    <State from={storeId} select={selectCounter}>
      {counter => (
        <>
          <div>Counter: {counter}</div>
          <State from={storeId} select={selectActions}>
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
    <StateInspector from={storeId} />
  </div>
);
```
