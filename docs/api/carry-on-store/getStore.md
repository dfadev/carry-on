---
id: getStore
title: getStore
---

## `getStore(storeId)`

| Parameter | Description                   |
| --------- | ----------------------------- |
| `storeId` | The name of the store to use. |

Retrieves a store. The default store is returned if storeId isn't specfied.

## Example

```js live noInline
import { getStore } from "carry-on-store";

const store = getStore("getStoreExample");

render(<Inspector data={store} />);
```
