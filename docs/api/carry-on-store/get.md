---
id: get
title: get
---

## `get(fn, storeId)`

## `get(storeId, fn)`

Retrieves state from a store. Both parameters are optional.

| Parameter | Description                                     |
| --------- | ----------------------------------------------- |
| `storeId` | The name of the store to use.                   |
| `fn`      | The function to execute with the current state. |

```js live noInline
import { get, set } from "carry-on-store";

const storeId = "getExample";

set(storeId, state => {
  state.field = "value";
});

const currentState = get(storeId);

const field = get(storeId, state => state.field); // value

render(<Inspector data={currentState} />);
```
