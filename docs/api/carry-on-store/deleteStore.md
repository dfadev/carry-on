---
id: deleteStore
title: deleteStore
---

## `deleteStore(storeId)`

Remove a store. If `storeId` is not specified the default store is removed.

| Parameter | Description                   |
| --------- | ----------------------------- |
| `storeId` | The name of the store to use. |

```js live noInline
import { register, deleteStore } from "carry-on-store";

register({ state: { field: "value" } });
const initialState = get();
deleteStore();
const nextState = get();

render(
  <>
    <h6>Initial State:</h6>
    <Inspector data={initialState} />
    <h6>Next State:</h6>
    <Inspector data={nextState} />
  </>
);
```
