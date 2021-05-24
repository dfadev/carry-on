---
id: coreConcepts
title: Core Concepts
---

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



### State is initially registered with an unconnected store container.  

No access or mutation can occur until the container is connected. The store container is connected by a call to `connect`, `get`, or `set`.

These initial registrations are queued until the container is connected. Queued registrations are processed in the order specified by the state's `priority` key.

The reason a container is initially unconnected is to allow for deterministic registration of middleware registered out of order.

```js live noInline
register({ state: { value1: 1, value2: 2 } });

connect(); // connect the default store container
render(StateInspector);
```

