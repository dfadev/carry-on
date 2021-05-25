---
id: devTools
title: devTools
---

## `devTools({ ...opts })`

### devTools options

| Property     | Description                            |
| ------------ | -------------------------------------- |
| `timeTravel` | Should the plugin support time travel. |

The store can be viewed using the [Redux Dev Tools Extension](https://github.com/zalmoxisus/redux-devtools-extension).

If you are using multiple named stores, the `devTools` plugin must be registered on each store you want to use it on.

```js
import { register, devTools } from "carry-on-store";

register(devTools({ timeTravel: false }));
```
