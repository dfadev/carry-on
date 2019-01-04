---
id: useStore
title: useStore
---

## Import

```JavaScript
import { useStore } from "carry-on-store";
```

## `useStore(`_`storeId`_`)`

Retrieves a store instance. The default store is returned if storeId isn't
specfied.

| Parameter | Description                   |
| --------- | ----------------------------- |
| `storeId` | The name of the store to use. |

## Example

```JavaScript
const store = useStore();
```
