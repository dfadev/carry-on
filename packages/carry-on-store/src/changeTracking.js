/** @format **/
import { keys, proxyState, deproxify, mutateSetA } from "carry-on-utils";

export function compareChanges(changes, watch) {
  const queue = [];
  queue.push({ changes, watch });

  while (queue.length > 0) {
    const item = queue.pop();
    const entries = item.changes;

    for (let i = 0, len = entries.length; i < len; i++) {
      const entry = entries[i];
      const key = entry.key;
      const watchValue = item.watch[key];

      if (watchValue === true) return true;
      if (watchValue !== undefined) {
        const nextChanges = entry.changes;

        if (nextChanges === true) return true;
        queue.push({
          changes: nextChanges,
          watch: watchValue
        });
      }
    }
  }

  return false;
}

export function watchGet(state, select) {
  const trappedState = proxyState(state);
  const selectedState = select(trappedState.state);
  trappedState.seal();
  const watch = trappedState.affected;
  const deproxified = deproxify(selectedState);
  const finalState = deproxified !== undefined ? deproxified : selectedState;

  return [finalState, watch];
}

export function calculateChanges(patches) {
  const stage1 = {};
  for (let i = 0, len = patches.length; i < len; i++)
    mutateSetA(stage1, patches[i].path, true);

  // precompute object walk so keys is called the least amount necessary
  const stage2 = [];
  const queue = [];
  queue.push({ keys: keys(stage1), changes: stage1, out: stage2 });

  while (queue.length > 0) {
    const item = queue.pop();

    for (let i = 0, len = item.keys.length; i < len; i++) {
      const key = item.keys[i];
      const changes = item.changes[key];
      if (changes === true) {
        item.out.push({ key, changes });
      } else {
        const nextChanges = [];
        queue.push({
          keys: keys(changes),
          changes,
          out: nextChanges
        });
        item.out.push({ key, changes: nextChanges });
      }
    }
  }

  return stage2;
}
