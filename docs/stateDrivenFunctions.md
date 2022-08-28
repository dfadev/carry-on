---
id: stateDrivenFunctions
title: State Driven Functions
---

## State driven functions

A `watch` function executes once immediately with the current state and then subsequently as state changes.

```jsx live noInline
import { register, watch, set } from "carry-on-store";

const storeId = "stateDrivenFunctions";

state(storeId, ({ get, set }) => ({
  value: 1,
  subscriptions: [],
  unsubscribe: () => {
    set(state => {
      state.subscriptions.forEach(fn => fn());
      state.subscriptions = [];
    });
  },
  logs: []
}));

// simple vocabulary for watch readability
const positiveValue = ({ value }) => value >= 0;
const logValue = ({ logs, value }) => logs.push("watch value=" + value);
const bigLogs = ({ logs: { length } }) => length > 10;
const trimLogs = ({ logs }) => logs.shift();
const logSizeOk = () => {
  throw new Error("log size small");
};
const error = (state, error, id) => {
  console.log(error);
};

set(storeId, ({ subscriptions }) => {
  const interval = setInterval(() => {
    set(storeId, state => {
      state.value += 1;
      state.logs.push("setInterval value=" + state.value);
    });
  }, 1000);

  subscriptions.push(
    watch({ from: storeId, if: positiveValue, then: logValue }),
    watch({
      from: storeId,
      if: bigLogs,
      then: trimLogs,
      else: logSizeOk,
      error
    }),
    () => clearInterval(interval)
  );
});

render(
  <StateInspector from={storeId} onUnmount={state => state.unsubscribe()} />
);
```
