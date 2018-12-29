---
id: register
title: register
---
## `register(`*`[`*`{ `*`state`*`, `*`middleware`*`, `*`priority`*` }`*`]`*`, `*`id`*`)`

|Parameter|Description|
|---|---|
|`state`|Function or object that represents the state to register|
|`middleware`|Function that acts as middleware wrapped around an action|
|`priority`|State is registered in a random order unless a priority is specified.  Higher priority state is registered first.|
|`id`|The name of the store to register state in.|

 # Registering *`state`*:

The *`set`* function is used to change state and the *`get`* function to retrieve state.

|Function|Description|
|---|---|
|`set(state => {}, `*`type`*`)`|Calls a function that mutates the passed state.  Optionally specify a string `type` to display when viewing state changes in Dev Tools.|
|`get(state => {})`|Calls a function that queries the passed state and returns the result.|


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

register({ state });
```



When *`register`* is called multiple times it merges state, potentially into a running store:

```JavaScript
register({
	state: {
	  field1: "value1"
	}
});

register({
	state: {
	  field2: "value2"
	}
});

// The store's state will look like:
//{
//	field1: "value1",
//	field2: "value2"
//}
```



Use multiple stores with the *`id`* parameter:
```JavaScript
const state = {
	field1: "value1"
};

register({ state }, "store1");
register({ state }, "store2");
```


