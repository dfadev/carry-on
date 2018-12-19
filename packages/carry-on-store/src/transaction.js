/** @format **/

export default function transaction() {
  const transactions = [];

  return {
    state: ({ dispatch }) => ({
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
      begin: () =>
        dispatch(state => {
          transactions.push(() => dispatch(() => state, "Rollback", true));
          return state;
        }, "Begin Transaction")
    })
  };
}
