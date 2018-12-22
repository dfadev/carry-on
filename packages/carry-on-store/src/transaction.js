/** @format **/

export default function transaction() {
  const transactions = [];

  return {
    state: ({ dispatch, query }) => ({
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
          const rollbackState = query();
          transactions.push(() =>
            dispatch(() => rollbackState, "Rollback", true)
          );
          return state;
        }, "Begin Transaction")
    })
  };
}
