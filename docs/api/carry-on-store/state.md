---
id: state
title: state
---

## `state(storeId, state)`

Register initial state with a store.

| Parameter | Description                                              |
| --------- | -------------------------------------------------------- |
| `state`   | Function or object that represents the state to register |
| `storeId` | The name of the store to register state in.              |

## Registering state:

The _`set`_ function is used to change state and the _`get`_ function to retrieve state.

| Function                      | Description                                                                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `set(state => {},`_`type`_`)` | Calls a function that mutates the passed state. Optionally specify a string `type` to display when viewing state changes in Dev Tools. |
| `get(state => {})`            | Calls a function that queries the passed state and returns the result.                                                                 |

```js
import { state } from "carry-on-store";

const myState = ({ get, set }) => ({
  field: "value",
  change(val) {
    set(state => {
      state.field = val;
    }, "Change Value");
  },
  isIt(val) {
    return get(({ field }) => field === val);
  }
});

// register one state
state(myState);

// register multiple states
state([myState, myState, myState]);

// register state into a named store
state(myState, "store1");

// can also specify the storeId first
state("store1", myState);
```
