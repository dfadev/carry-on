---
id: watch
title: watch
---

## `watch({ ...opts })`

Executes the specified if/then functions immediately with the current state and subsequently when state accessed changes.

### Watch options:

| Property   | Description                                                                                                                        | Default |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `from`     | What store to retrieve state from.                                                                                                 |         |
| `path`     | The state path to retrieve. Specified as a dotted path string, with support for arrays. Sample: `"my.field.path[10].name"`         |         |
| `if`       | The watch query function. Any changes to fields accessed by this function will trigger a re-execution.                             |         |
| `then`     | The watch mutation `then` function. This function will be called when the result of `if` is true. The state may be modified here.  |         |
| `else`     | The watch mutation `else` function. This function will be called when the result of `if` is false. The state may be modified here. |         |
| `error`    | The watch mutation `error` function. This function will be called when an exception occurs. The state may be modified here.        |         |
| `strict`   | When true, the fields the function accesses will be tracked on every execution instead of on just the first one.                   | true    |
| `default`  | The default value when the state is undefined.                                                                                     |         |
| `throttle` | Milliseconds to throttle executions                                                                                                |         |
| `debounce` | Milliseconds to debounce executions                                                                                                |         |
| `debug`    | When true, log messages regarding state changes will be printed to the `console`.                                                  |         |
| `verbose`  | When true, verbose log messages are printed to the `console`.                                                                      |         |
| `id`       | Debug log uses this to identify components                                                                                         |         |

## Example

```jsx live noInline
import { register, watch, set } from "carry-on-store";

const storeId = "watchExample";

register(storeId, {
  state: ({ get, set }) => ({
    value: 1,
    subscriptions: [],
    unsubscribe: () => {
      set(state => {
        state.subscriptions.forEach(fn => fn());
        state.subscriptions = [];
      });
    },
    logs: []
  })
});

// simple vocabulary for watch readability
const positiveValue = ({ value }) => value >= 0;
const logValue = ({ logs, value }) => logs.push("watch value=" + value);
const bigLogs = ({ logs: { length } }) => length > 10;
const trimLogs = ({ logs }) => logs.shift();
const logSizeOk = () => {
  throw new Error("log size OK");
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

## Watch Debugging

```js
import { Watch } from "carry-on-store";

Watch.Debug = true;
Watch.Verbose = true;
```

You can turn on watch debugging to send debug messages to the console.
