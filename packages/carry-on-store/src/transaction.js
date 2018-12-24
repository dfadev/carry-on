/** @format **/

export default function transaction() {
  const transactions = [];

  return {
    state: ({ set, get }) => ({
      commit: () => {
        if (transactions.length === 0) throw new Error("no tx");
        return set(state => {
          transactions.pop();
          return state;
        }, "Commit");
      },
      rollback: () => {
        if (transactions.length === 0) throw new Error("no tx");
        return transactions.pop()();
      },
      begin: () =>
        set(state => {
          const rollbackState = get();
          transactions.push(() =>
            set(s => {
              if (s === undefined) s = {};
              const keys = Object.keys(s);
              for (let i = 0, len = keys.length; i < len; i++)
                delete s[keys[i]];
              const newState = Object.assign(s, rollbackState);
              return newState;
            }, "Rollback")
          );
          return state;
        }, "Begin Transaction")
    })
  };
}
