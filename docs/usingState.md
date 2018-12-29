---
id: usingState
title: Using State
---

## Import

```JavaScript
import { State } from "carry-on-react";
```

## Render function

The child node of a `State` component is a render function.  The render function
is given the store state as it's first parameter.

```JavaScript
const App = props => (
  <State>
    {state => ({
      <div>
        {state.value}
      </div>
    })
  </State>
);

```
