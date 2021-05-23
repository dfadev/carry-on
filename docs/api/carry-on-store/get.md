---
id: get
title: get
---

## Import

```js
import { get } from "carry-on-store";
```

## `get(`_`fn`_`, `_`storeId`_`)`
## `get(`_`storeId`_`, `_`fn`_`)`

Retrieves state from a store.  Both parameters are optional.

```js live noInline
const storeId = "getExample";

set(storeId, state => { state.field = "value"; });

const currentState = get(storeId);

const field = get(storeId, state => state.field); // value

render(<Inspector data={currentState}/>);
```
