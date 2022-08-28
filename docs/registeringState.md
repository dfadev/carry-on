---
id: registeringState
title: Registering State
---

## Import

```js
import { state } from "carry-on-store";
```

## Define initial state

Initial state can be set by passing state to the `state` function. It is optional to register initial state.

### State as a function

State can be defined by a function accepting one parameter. The parameter
passed is a plain object containing the keys `id`, `get`, and `set`.

`id` is the store instance identifier. It will be undefined for the default
store.

`get` is a function that actions use to query the current state.

`set` is a function that actions use to change state values.

The function must return an object representing the initial state:

```js
const counter = ({ id, get, set }) => ({
  counter: 0,
  inc: () =>
    set(state => {
      state.counter += 1;
    })
});
```

### State as an object

State can also be defined as a plain object if there are no actions that require setting and querying state.

```js
const plain = {
  field1: "value1",
  field2: "value2",
  nested: {
    field1: "value1",
    field2: "value2"
  }
};
```

### Actions

Actions are defined by functions inside a state object:

```js
const actions = ({ id, get, set }) => ({
  action1() {},
  action2() {},
  action3() {}
});
```

#### Get

When an action only needs read access to the current state, it uses the `get`
function:

```js
const gets = ({ id, get, set }) => ({
  logValue() {
    get(state => {
      console.log("value is", state.value);
    });
  }
});
```

A shorter alternative:

```js
const gets = ({ id, get, set }) => ({
  logValue() {
    console.log("value is", get().value);
  }
});
```

#### Set

An action uses the `set` function to change state values.

```js
const sets = ({ id, get, set }) => ({
  field: "",
  setField(val) {
    set(state => {
      state.field = val;
    });
  }
});
```

## Registration

State can be registered with a store instance at any time. If the store is not connected, the registration will be queued until the store is connected.

### Register on default store:

```js live noInline
state({ counter: 0 });

render(<StateInspector />);
```

### Register on a named store:

```js live noInline
const storeId = "Store1";

state({ field1: "value1" }, storeId);

// or

state(storeId, { field2: "value2" });

render(<StateInspector from="Store1" />);
```

## Multiple registrations

### Multiple calls

When `register` is called multiple times it merges state, potentially into a connected store:

```js live noInline
const storeId = "multiCalls";

state(storeId, { field1: "value1" });

state(storeId, { field2: "value2" });

render(<StateInspector from={storeId} />);
```

### Array of registrations

When registering more than one state, an array of registrations can be passed:

```js live noInline
const storeId = "arrayOfRegistrations";

const state1 = { field1: "value1" };

const state2 = { field2: "value2" };

state(storeId, [state1, state2]);

render(<StateInspector from={storeId} />);
```
