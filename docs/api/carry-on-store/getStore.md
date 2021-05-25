---
id: getStore
title: getStore
---

## `getStore(storeId)`

Retrieves a store. The default store is returned if storeId isn't specfied.

| Parameter | Description                   |
| --------- | ----------------------------- |
| `storeId` | The name of the store to use. |

## Example

```js live noInline
import { getStore } from "carry-on-store";

const store = getStore("getStoreExample");

render(<Inspector data={store} />);
```
