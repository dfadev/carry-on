---
id: index
slug: /
title: Getting Started
---
import BrowserOnly from "@docusaurus/BrowserOnly";
import Inspector from "react-inspector";
import { State } from "carry-on-react";
import theme from "./inspector-theme";

## Install

```bash

npm install --save carry-on-react

```

## Import

```js

import { State } from "carry-on-react";
import { register } from "carry-on-store";

```

## Simple store

```js live noInline

register({
  state: ({ set }) => ({
    counter: 0,
    inc: () => set(state => { state.counter++; }),
    dec: () => set(state => { state.counter--; })
  })
});

const App = () => (
  <State>
    {state => (
      <div>
        <div>Counter: {state.counter}</div>
        <button onClick={state.inc}>+</button>
        <button onClick={state.dec}>-</button>
      </div>
    )}
  </State>
);

render(<App />);
```

<BrowserOnly>
  {() => 
    <State select={s => ({ ...s })}>
      {state => <Inspector data={state} theme={theme} expandLevel={2} />}
    </State>
  }
</BrowserOnly>
