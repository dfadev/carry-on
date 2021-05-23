---
id: coreConcepts
title: Core Concepts
---

### The container becomes connected either by an explicit call to `connect` or by using a `get` or `set` call.

State can be registered in an unconnected store container, but no access or mutation can occur until the container is connected. These registrations are queued until a call to `connect` is made either explicitly or by a call to `get` or `set` which calls `connect` if the store is unconnected. The `connect` function processes the queued registrations in the order specified by the registered state's `priority` key.

The reason a container can be unconnected is to allow for deterministic registration of middleware that is registered in a potentially undeterministic fashion.

```js live noInline
register({ state: { value1: 1, value2: 2 } });

connect(); // connect the default store container
render(StateInspector);
```

### Access to state is scoped by `get` and `set`.

Code inside a `set` function has read and write access to state values.

```js live noInline
import { set } from "carry-on-store";

set(state => {
  state.value1 = 1;
  state.value2 = 2;
});

render(<StateInspector />);
```

Values can only be read inside a `get` function.

```js live noInline
import { get } from "carry-on-store";

const values = get(state => [state.value1, state.value2]);
// values === [1, 2]

render(<StateInspector />);
```

### The state container is synchronous.

Execute asynchronous code outside of `get` and `set` scopes.

### `State.render` maps to a `get` scope.

The `State` component uses a specialized `get` scope that tracks field access to provide access to the store.
