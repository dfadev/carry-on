---
id: getStore
title: getStore
---

## Import

```JavaScript
import { getStore } from "carry-on-store";
```

## `getStore(`_`storeId`_`)`

Retrieves a store instance. The default store is returned if storeId isn't
specfied.

| Parameter | Description                   |
| --------- | ----------------------------- |
| `storeId` | The name of the store to use. |

## Example

```JavaScript
const store = getStore();
```
