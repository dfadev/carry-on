---
id: stateDrivenFunctions
title: State Driven Functions
---

## State driven functions

A `watch` function executes once immediately with the current state and then subsequently as state changes.

```jsx live noInline
const storeId = "stateDrivenFunctions";

register(storeId, {
  state: ({ get, set }) => ({
    value: 1,
    subscriptions: [],
    unsubscribe: () => {
      get().subscriptions.forEach(fn => typeof fn === "function" && fn());
      set(state => (state.subscriptions = []));
    },
    logs: []
  })
});

// cannot add watches to a store that isn't connected
connect(storeId);

// simple vocabulary for watch readability
const positiveValue = ({ value }) => value >= 0;
const logValue = ({ logs, value }) => logs.push("watch value=" + value);
const bigLogs = ({ logs: { length } }) => length > 10;
const trimLogs = ({ logs }) => logs.shift();

set(storeId, ({ subscriptions }) => {
  const interval = setInterval(() => {
    set(storeId, state => {
      state.value += 1;
      state.logs.push("setInterval value=" + state.value);
    });
  }, 1000);

  subscriptions.push(
    watch({ from: storeId, if: positiveValue, then: logValue }),
    watch({ from: storeId, if: bigLogs, then: trimLogs }),
    () => clearInterval(interval)
  );
});

render(
  <StateInspector from={storeId} onUnmount={state => state.unsubscribe()} />
);
```