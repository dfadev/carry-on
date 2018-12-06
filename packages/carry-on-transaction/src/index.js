/** @format **/

export default () => {
  const transactions = [];

  return {
    id: "tx",
    state: dispatch => ({
      //transactions: [],
      commit: () => {
        if (transactions.length === 0) throw new Error("no tx");
        return dispatch(state => {
          transactions.pop();
          return state;
        }, "Commit");
      },
      rollback: () => {
        if (transactions.length === 0) throw new Error("no tx");
        return transactions.pop()();
      },
      make: rollbackState => () =>
        dispatch(() => rollbackState, "Rollback", true),
      begin: () =>
        dispatch(state => {
          transactions.push(state.plug.tx.make(state));
          return state;
        }, "Begin Transaction")
    })
  };
};
