---
id: modernImmutability
title: Modern Immutability
---
`carry-on` uses `immer` to manage immutability.  `immer` implements a strategy which allows managing immutable data as if it were mutable data.

```js live noInline
const storeId = "immutable";

deleteStore(storeId);
connect(storeId);

const store = getStore(storeId);

const initialState = store.get();

store.set(state => {
  state.value1 = "abc"; // field assignments are proxied by immer
});

const mutatedState = store.get();

render(
  <>
    <h6>Initial State:</h6>
    <Inspector data={initialState} />
    <h6>Mutated State:</h6>
    <Inspector data={mutatedState} />
  </>
);
```
