# carry-on-notify

```carry-on``` plugin that notifies subscribers when state changes.

### Usage

```JavaScript
import notifyListeners from "carry-on-notify";
import { Store } from "carry-on-react";

const notify = notifyListeners();

const subscriber = state => {
  console.log('state changed', state);
};

const unsubscribe = notify.subscribe(subscriber);

const App = () => (
  <Store plugins={notify.plugin}>
  </Store>
);
```
