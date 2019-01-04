---
id: register
title: register
---

## Import

```JavaScript
import { register } from "carry-on-store";
```

## `register(`_`[`_`{`_`state`_`,`_`middleware`_`,`_`priority`_`}`_`]`_`,`_`storeId`_`)`

| Parameter    | Description                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `state`      | Function or object that represents the state to register                                                         |
| `middleware` | Function that acts as middleware wrapped around an action                                                        |
| `priority`   | State is registered in a random order unless a priority is specified. Higher priority state is registered first. |
| `storeId`    | The name of the store to register state in.                                                                      |

## Registering state:

The _`set`_ function is used to change state and the _`get`_ function to retrieve state.

| Function                      | Description                                                                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `set(state => {},`_`type`_`)` | Calls a function that mutates the passed state. Optionally specify a string `type` to display when viewing state changes in Dev Tools. |
| `get(state => {})`            | Calls a function that queries the passed state and returns the result.                                                                 |

```JavaScript
const state = ({ get, set }) => ({
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
register({ state });


// register multiple states
register([
  { state },
  { state },
  { state }
]);


// register state into a named store
register({ state }, "store1");
```
