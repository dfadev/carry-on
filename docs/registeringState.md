---
id: registeringState
title: Registering State
---

## Import

```JavaScript
import { register } from "carry-on-store";
```

## Define

### As a function

State can be defined by a function accepting one parameter.  The parameter
passed is an object containing the keys `id`, `get`, and `set`.

`id` is the store instance identifier.  It will be undefined for the default
store.

`get` is a function that actions use to query the current state.

`set` is a function that actions use to change state values.

The function must return an object representing the initial state:

```JavaScript
const state = ({ id, get, set }) => ({
  counter: 0,
  inc: () => set(state => {
    state.counter++;
  })
});
```

### As an object

State can also be defined as a plain object if there are no actions that require setting and querying state.

```JavaScript
const state = {
  field1: "value1",
  field2: "value2",
  nested: {
    field1: "value1",
    field2: "value2"
  }
};
```

## Register

State is registered with a store instance.  You may specify a store instance
identifier as the second parameter to `register`.  Omitting this parameter will
register state with the default store.

### Register on default store:

```JavaScript
register({ state });
```

### Register on a named store:

```JavaScript
register({ state }, "Store1");
```

## Multiple registrations

### Multiple calls

When `register` is called multiple times it merges state, potentially into a running store:

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

### Array of registrations

When registering more than one state, an array of registrations can be passed:

```JavaScript
const state1 = {
  field1: "value1"
};

const state2 = {
  field2: "value2"
};

register([
{ state: state1 },
{ state: state2 }
]);
```
