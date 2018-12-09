# carry-on-transaction

```carry-on``` plugin to add commit/rollback support to the store.

### Usage

```JavaScript
import transaction from "carry-on-transaction";
import { Store, State } from "carry-on-react";

let commits = 0;
let rollbacks = 0;
let commitException = 0;
let rollbackException = 0;

const store = ({ dispatch, query, state }) => {
  const inc = () =>
    dispatch(
      state => ({
        ...state,
        counter: state.counter + 1
      }),
      "Increment"
    );

  const dec = () =>
    dispatch(
      state => ({
        ...state,
        counter: state.counter - 1
      }),
      "Decrement"
    );

  function beginClick(msg) {
    // start transaction
    state.begin();
  }

  function commitClick() {
    const before = query();
    try {
      const after = state.commit();
    } catch (e) {
      commitException += 1;
    }
    commits++;
  }

  function rollbackClick() {
    const before = query();
    try {
      const after = state.rollback();
    } catch (e) {
      rollbackException += 1;
    }
    rollbacks++;
  }

  return {
    counter: 0,
    inc,
    dec,
    beginClick,
    commitClick,
    rollbackClick
  };
};

const App = () => (
  <Store init={store} plugins={[transaction()]}>
    <State>
      {({ counter, inc, dec, beginClick, commitClick, rollbackClick }) => (
        <>
          <div>Counter: {counter}</div>
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
          <button onClick={beginClick}>begin tx</button>
          <button onClick={commitClick}>commit</button>
          <button onClick={rollbackClick}>rollback</button>
        </>
      )}
    </State>
  </Store>
);

```
