import { keys } from "carry-on-utils";

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
              const keyList = keys(s);
              for (let i = 0, len = keyList.length; i < len; i += 1)
                delete s[keyList[i]];
              const newState = Object.assign(s, rollbackState);
              return newState;
            }, "Rollback")
          );
          return state;
        }, "Begin Transaction")
    }),
    dispose: () => {
      transactions.length = 0;
    }
  };
}
