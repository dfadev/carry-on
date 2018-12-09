# carry-on-devtools

```carry-on``` plugin to add support for [Redux Dev Tools Extension](https://github.com/zalmoxisus/redux-devtools-extension)

### Usage

```JavaScript
import devTools from "carry-on-devtools";
import { Store } from "carry-on-react";

const App = () => (
  <Store plugins={devTools}>
  </Store>
);
```
