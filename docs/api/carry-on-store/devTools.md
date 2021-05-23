---
id: devTools
title: devTools
---

## Import

```js
import { register, devTools } from "carry-on-store";
```

## Redux Dev Tools Extension

The store can be viewed and time traveled using [Redux Dev Tools Extension](https://github.com/zalmoxisus/redux-devtools-extension).

If you are using multiple named stores, the `devTools` plugin must be registered on each store you want to use it on.

```js
register(devTools());
```
