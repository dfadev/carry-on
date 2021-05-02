---
id: watch
title: watch
---

## Import

```js

import { watch } from "carry-on-store";

```

## `watch(`_`fn|opts`_`,`_`storeId`_`)`

Executes the specified function immediately with the current state and
subsequently when state the function accessed changes.

| Parameter | Description                   |
| --------- | ----------------------------- |
| `fn`      | The function to execute.      |
| `opts`    | Watch options, see below      |
| `storeId` | The name of the store to use. |

### Watch options:

| Property   | Description                                                                                                                |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| `fn`       | The function. This function will be called with the state as it's first parameter.                                         |
| `from`     | What store to retrieve state from.                                                                                         |
| `path`     | The state path to retrieve. Specified as a dotted path string, with support for arrays. Sample: `"my.field.path[10].name"` |
| `select`   | An optional function that selects the required state.                                                                      |
| `constant` | When true, the function will query state and execute only once.                                                            |
| `strict`   | When true, the fields the function accesses will be tracked on every execution instead of on just the first one.           |
| `default`  | The default value when the state is undefined.                                                                             |
| `throttle` | Milliseconds to throttle executions                                                                                        |
| `debounce` | Milliseconds to debounce executions                                                                                        |
| `debug`    | When true, log messages regarding state changes will be printed to the `console`.                                          |
| `verbose`  | When true, verbose log messages are printed to the `console`.                                                              |
| `id`       | Debug log uses this to identify components                                                                                 |

## Example

```js

const unsubscribe = watch(state => {
  console.log(state.field);
});

const store = getStore();

store.set(state => {
  state.field = 1;
});

store.set(state => {
  state.field = 2;
});

store.set(state => {
  state.field = 3;
});

unsubscribe();

```

## Watch Debugging


```js

import { Watch } from "carry-on-store";

Watch.Debug = true;
Watch.Verbose = true;

```

You can turn on watch debugging to send debug messages to the console.

