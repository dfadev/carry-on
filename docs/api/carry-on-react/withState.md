---
id: withState
title: withState
---

## `withState(opt)(Component)`

A higher order component that injects state into the wrapped component.

### withState options

| Property    | Description                                                                                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| `asProp`    | Specify what prop to pass the state to the wrapped component as.                                                           |
| `from`      | What store to retrieve state from.                                                                                         |
| `path`      | The state path to retrieve. Specified as a dotted path string, with support for arrays. Sample: `"my.field.path[10].name"` |
| `select`    | A function that selects the required state.                                                                                |
| `constant`  | When true, the `State` component will query state and render only once.                                                    |
| `strict`    | When true, the `State` will track accessed keys on every update instead of on just the first one.                          |
| `default`   | The default value when the state is undefined.                                                                             |
| `throttle`  | Milliseconds to throttle change requests                                                                                   |
| `debounce`  | Milliseconds to debounce change requests                                                                                   |
| `debug`     | When true, log messages regarding state changes will be printed to the `console`.                                          |
| `verbose`   | When true, verbose log messages are printed to the `console`.                                                              |
| `id`        | Debug log uses this to identify components                                                                                 |
| `onMount`   | Called with the current state when the component mounts.                                                                   |
| `onUnmount` | Called with the current state when the component unmounts.                                                                 |

```js
import { withState } from "carry-on-react";

const App = withState({ path: "counter", asProp: "counter" })(props => (
  <div>{counter}</div>
));
```

The properties used to pass state to the wrapped component are determined by:

- The `asProp` option, if specified
- If the state or `select` result is an object it will be spread onto multiple props
- When the state isn't an object it will be passed as the `state` property.

Normally you would always use the `path` or `select` options when using `withState` because without them your component would render on every state change:

```js
import { withState } from "carry-on-react";

const App = withState()(props => <div>I render every state change</div>);
```
