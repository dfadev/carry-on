---
id: getStore
title: getStore
---
## Import

```js

import { getStore } from "carry-on-store";

```

## `getStore(`_`storeId`_`)`

Retrieves a store container instance. The default store is returned if storeId isn't specfied.

| Parameter        | Description                   |
| ---------------- | ----------------------------- |
| `storeId` | The name of the store to use. |

## Example

```js live noInline

const store = getStore("getStoreExample");

render(<Inspector data={store} />);

```
