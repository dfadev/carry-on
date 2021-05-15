---
id: watch
title: watch
---

## Import

```js
import { watch } from "carry-on-store";
```

## `watch(`_`{ ...opts }`_`)`

Executes the specified if/then functions immediately with the current state and subsequently when state accessed changes.

### Watch options:

| Property   | Description                                                                                                                                                                 | Default |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `from`     | What store to retrieve state from.                                                                                                                                          |         |
| `path`     | The state path to retrieve. Specified as a dotted path string, with support for arrays. Sample: `"my.field.path[10].name"`                                                  |         |
| `if`       | The watch query function. This function will be called with the state as it's first parameter. Any changes to fields accessed by this function will trigger a re-execution. |         |
| `then`     | The watch mutation function. This function will be called with the state as it's first parameter when the result of `if` is true. The state may be modified here.           |         |
| `strict`   | When true, the fields the function accesses will be tracked on every execution instead of on just the first one.                                                            | true    |
| `default`  | The default value when the state is undefined.                                                                                                                              |         |
| `throttle` | Milliseconds to throttle executions                                                                                                                                         |         |
| `debounce` | Milliseconds to debounce executions                                                                                                                                         |         |
| `debug`    | When true, log messages regarding state changes will be printed to the `console`.                                                                                           |         |
| `verbose`  | When true, verbose log messages are printed to the `console`.                                                                                                               |         |
| `id`       | Debug log uses this to identify components                                                                                                                                  |         |

## Example

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
const positiveValue = ({ value }) => value > -1;
const logValue = ({ logs, value }) => logs.push("watch value=" + value);
const bigLogs = ({ logs: { length } }) => length > 10;
const trimLogs = ({ logs }) => logs.shift();

set(storeId, ({ subscriptions }) => {
  const interval = setInterval(() => {
    set(storeId, state => {
      state.value++;
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

## Watch Debugging

```js
import { Watch } from "carry-on-store";

Watch.Debug = true;
Watch.Verbose = true;
```

You can turn on watch debugging to send debug messages to the console.
