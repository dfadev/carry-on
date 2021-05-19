---
id: coreConcepts
title: Core Concepts
---
### A container must be connected before access and mutation can occur.

State can be registered in an unconnected store container, but no access or mutation can occur until the container is connected.

```js live noInline
register({ state: { value1: 1, value2: 2 } });

connect();  // connect the default store container
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

const values = get(state => [ state.value1, state.value2 ]); 
// values === [1, 2]

render(<StateInspector />);
```

### The state container is synchronous.

Execute asynchronous code outside of `get` and `set` scopes.

### `State.render` maps to a `get` scope.

The `State` component uses a `get` scope to provide access to the store.


