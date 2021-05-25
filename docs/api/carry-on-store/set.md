---
id: set
title: set
---

## `set(fn, storeId, type)`

## `set(storeId, fn, type)`

| Parameter | Description                                     |
| --------- | ----------------------------------------------- |
| `storeId` | The name of the store to use.                   |
| `fn`      | The mutation function to execute with the current state. |
| `type` | A string representing the action type.  Used with `devTools`. |

Sets store state.  The only required parameter is the mutation function.

```js live noInline
import { set } from "carry-on-store";

const storeId = "storeSetExample";

set(storeId, state => { 
  state.field1 = 1;
  state.field2 = 2;
});

render(<StateInspector from={storeId} />);
```
