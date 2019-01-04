---
id: subscribe
title: subscribe
---

## Import

```JavaScript
import { subscribe } from "carry-on-store";
```

## `subscribe(callback,`_`watch`_`,`_`storeId`_`)`

Subscribe to state changes. Returns a function that will unsubscribe.

| Parameter  | Description                                             |
| ---------- | ------------------------------------------------------- |
| `callback` | Function to call when state changes.                    |
| `watch`    | Optional object representing state keys to subscribe to |
| `storeId`  | The name of the store to subscribe to.                  |

## Subscribe to all changes

Only specifying the callback will subscribe to all state changes.

```JavaScript
const stateChanged = (state, changes) => {
  console.log("state changed", state, changes);
};

subscribe(stateChanged);
```

## Subscribe to some changes

Specifying the `watch` parameter allows you to control what state changes will
execute the `callback` function.

In this example, any changes to the fields `field1`, `nested`, and
`nested.field` will cause the `callback` function to execute.

```JavaScript
const stateChanged = (state, changes) => {
  console.log("state changed", state, changes);
};

const watches = {
  field1: true,
  nested: {
    field: true
  }
};

subscribe(stateChanged, watches);
```
