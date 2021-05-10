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

const App = () => (
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
    <State select={s => ({ ...s })}>
      {state => <Inspector data={state} expandLevel={5} />}
    </State>
  </>
);

render(<App />);
```

## Two named stores

```js live noInline
const store = {
  state: ({ set }) => ({
    counter: 0,
    inc: () => set(state => void state.counter++),
    dec: () => set(state => void state.counter--)
  })
};

register(store, "store1");
register(store, "store2");

const App = () => (
  <>
    <State from="store1">
      {state => (
        <div>
          <div>Counter: {state.counter}</div>
          <button onClick={state.inc}>+</button>
          <button onClick={state.dec}>-</button>
        </div>
      )}
    </State>
    <State from="store2">
      {({ counter, inc, dec }) => (
        <div>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
        </div>
      )}
    </State>
    <State from={"store1"} select={s => ({ ...s })}>
      {state => <Inspector data={state} expandLevel={5} />}
    </State>
    <State from={"store2"} select={s => ({ ...s })}>
      {state => <Inspector data={state} expandLevel={5} />}
    </State>
  </>
);

render(<App />);
```

## State select

```js live noInline
const storeId = "stateSelect";

register({
  state: ({ set }) => ({
    notSelected: "item",
    counter: 0,
    inc: () => set(state => void state.counter++),
    dec: () => set(state => void state.counter--)
  })
}, storeId);

const select = ({ counter, inc, dec }) => ({ counter, inc, dec });

const App = props => (
  <>
    <State from={storeId} select={select}>
      {({ counter, inc, dec, notSelected }) => (
        <div>
          <div>{notSelected}</div>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
        </div>
      )}
    </State>
    <State from={storeId} select={s => ({ ...s })}>
      {state => <Inspector data={state} expandLevel={5} />}
    </State>
  </>
);

render(<App />);
```

## Register state

```js live noInline
const storeId = "registerState";

register({
  state: ({ set }) => ({
    counter: 0,
    inc: () => set(state => void state.counter++),
    dec: () => set(state => void state.counter--)
  })
}, storeId);

const App = () => (
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
    <State from={storeId} select={s => ({ ...s })}>
      {state => <Inspector data={state} expandLevel={5} />}
    </State>
  </>
);

render(<App />);
```

## Register state on a named store

```js live noInline
const storeId = "store1";

register(
  {
    state: ({ set }) => ({
      counter: 0,
      inc: () => set(state => void state.counter++),
      dec: () => set(state => void state.counter--)
    })
  },
  storeId
);

const App = () => (
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
    <State from={storeId} select={s => ({ ...s })}>
      {state => <Inspector data={state} expandLevel={5} />}
    </State>
  </>
);

render(<App />);
```

## State path

```js live noInline
const storeId = "statePath";

register({
  state: ({ set }) => ({
    more: {
      stuff: {
        list: [{ item: "one" }, { item: "two" }]
      }
    }
  })
}, storeId);

const App = () => (
  <>
    <State from={storeId} path="more.stuff.list[0].item">
      {item => {
        return <div>{item}</div>;
      }}
    </State>
    <State from={storeId} select={s => ({ ...s })}>
      {state => <Inspector data={state} expandLevel={5} />}
    </State>
  </>
);

render(<App />);
```

## State path with default

```js live noInline
const storeId = "statePathDefault";

register({
  state: ({ set }) => ({
    more: {
      stuff: {
        list: [{ item: "one" }, { item: "two" }]
      }
    }
  })
}, storeId);

const App = () => (
  <>
    <State from={storeId} path="oops.more.stuff.list[0].item" default="ok">
      {item => {
        return <div>{item}</div>;
      }}
    </State>
    <State from={storeId} select={s => ({ ...s })}>
      {state => <Inspector data={state} expandLevel={5} />}
    </State>
  </>
);

render(<App />);
```

## State path on a named store using from

```js live noInline
const storeId = "statePathNamedStore";

register(
  {
    state: ({ set }) => ({
      more: {
        stuff: {
          list: [ { item: "one" }, { item: "two" } ]
        }
      }
    })
  },
  storeId
);

const App = () => (
  <>
    <State from={storeId} path="more.stuff.list[0].item">
      {item => <div>{item}</div>}
    </State>
    <State from={storeId} select={s => ({ ...s })}>
      {state => <Inspector data={state} expandLevel={5} />}
    </State>
  </>
);

render(<App />);
```

## Multiple select

```js live noInline
const storeId = "multipleSelect";

register({
  state: ({ set }) => ({
    counter: 0,
    inc: () => set(state => void state.counter++),
    dec: () => set(state => void state.counter--)
  })
}, storeId);

const selectCounter = ({ counter }) => counter;
const selectActions = ({ inc, dec }) => ({ inc, dec });

const App = props => (
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
    <State from={storeId} select={s => ({ ...s })}>
      {state => <Inspector data={state} expandLevel={2} />}
    </State>
  </div>
);

render(<App />);
```
