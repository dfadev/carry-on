---
id: deleteStore
title: deleteStore
---

## Import

```js
import { deleteStore } from "carry-on-store";
```

## `deleteStore(`_`storeId`_`)`

Removes a store. If `storeId` is not specified the default store is removed.

```js live noInline
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
