---
id: coreConcepts
title: Core Concepts
---

### Access to state is scoped by `get` and `set`.

Code inside a `set` function has read and write access to state values.

```js live noInline
import { set } from "carry-on-store";

const storeId = "setExample";

set(storeId, state => {
  state.field1 = 1;
  state.field2 = 2;
});

render(<StateInspector from={storeId} />);
```

Values can be read inside a `get` function.

```js live noInline
import { get, set } from "carry-on-store";

const storeId = "getExample";

set(storeId, state => {
  state.field1 = 1;
  state.field2 = 2;
});

const values = get(storeId, state => [state.field1, state.field2]);
// values === [1, 2]

render(<StateInspector from={storeId} />);
```

### The state container is synchronous.

Execute asynchronous code outside of `get` and `set` scopes.

### `State.render` maps to a specialized `get` scope.

The `State` component uses a specialized `get` scope that tracks field access. When changes to the tracked fields are detected, the component is rerendered.

### `State.render` is batched

Each `State` component affected by a state change will batch update using React's `unstable_batchedUpdates` facility.

### `State` is initially registered with an unconnected state container.

No access or mutation can occur until the container is connected. The state container is connected by a call to `connect`, `get`, or `set`.

Initial registrations are queued until the container is connected. Queued registrations are processed in the order specified by the state's `priority` key.

The reason a container is initially unconnected is to allow for deterministic registration of middleware registered out of order.
