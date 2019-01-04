---
id: index
title: Examples
---

## Default store

```JavaScript
register({
  state: ({ set }) => ({
    counter: 0,
    inc: () => set(state => void state.counter++),
    dec: () => set(state => void state.counter--)
  })
});

const App = () => (
  <State>
    {state => (
      <>
        <div>Counter: {state.counter}</div>
        <button onClick={state.inc}>+</button>
        <button onClick={state.dec}>-</button>
      </>
    )}
  </State>
);
```

## Two named stores

```JavaScript
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
  </>
);
```

## State select

```JavaScript
register({
  state: ({ set }) => ({
    notSelected: "item",
    counter: 0,
    inc: () => set(state => void state.counter++),
    dec: () => set(state => void state.counter--)
  })
});

const select = ({ counter, inc, dec }) => ({ counter, inc, dec });

const App = props => (
  <State select={select}>
    {({ counter, inc, dec, notSelected }) => (
      <div>
        <div>{notSelected}</div>
        <div>Counter: {counter}</div>
        <button onClick={inc}>+</button>
        <button onClick={dec}>-</button>
      </div>
    )}
  </State>
);
```

## Register state

```JavaScript
register({
  state: ({ set }) => ({
    counter: 0,
    inc: () => set(state => void state.counter++),
    dec: () => set(state => void state.counter--)
  })
});

const App = () => (
  <State>
    {({ counter, inc, dec }) => (
      <>
        <div>Counter: {counter}</div>
        <button onClick={inc}>+</button>
        <button onClick={dec}>-</button>
      </>
    )}
  </State>
);
```

## Register state on a named store

```JavaScript
register(
  {
    state: ({ set }) => ({
      counter: 0,
      inc: () => set(state => void state.counter++),
      dec: () => set(state => void state.counter--)
    })
  },
  "store1"
);

const App = () => (
  <State from="store1">
    {({ counter, inc, dec }) => (
      <>
        <div>Counter: {counter}</div>
        <button onClick={inc}>+</button>
        <button onClick={dec}>-</button>
      </>
    )}
  </State>
);
```

## State path

```JavaScript
register({
  state: ({ set }) => ({
    more: {
      stuff: {
        list: [{ item: "one" }, { item: "two" }]
      }
    }
  })
});

const App = () => (
  <State path="more.stuff.list[0].item">
    {item => {
      return <div>{item}</div>;
    }}
  </State>
);
```

## State path with default

```JavaScript
register({
  state: ({ set }) => ({
    more: {
      stuff: {
        list: [{ item: "one" }, { item: "two" }]
      }
    }
  })
});

const App = () => (
  <State path="oops.more.stuff.list[0].item" default="ok">
    {item => {
      return <div>{item}</div>;
    }}
  </State>
);
```

## State path on a named store using from

```JavaScript
register(
  {
    state: ({ set }) => ({
      more: {
        stuff: {
          list: [
            {
              item: "one"
            },
            {
              item: "two"
            }
          ]
        }
      }
    })
  },
  "store1"
);

const App = () => (
  <State from="store1" path="more.stuff.list[0].item">
    {item => <div>{item}</div>}
  </State>
);
);
```

## Multiple select

```JavaScript
register({
  state: ({ set }) => ({
    counter: 0,
    inc: () => set(state => void state.counter++),
    dec: () => set(state => void state.counter--)
  })
});

const selectCounter = ({ counter }) => counter;
const selectActions = ({ inc, dec }) => ({ inc, dec });

const App = props => (
  <div>
    <State select={selectCounter}>
      {counter => (
        <>
          <div>Counter: {counter}</div>
          <State select={selectActions}>
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
  </div>
);
```