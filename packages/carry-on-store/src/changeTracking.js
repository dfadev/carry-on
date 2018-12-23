/** @format **/
import { mutateSet, mutateSetA } from "carry-on-utils";
import { spreadGuardsEnabled, proxyState, deproxify } from "proxyequal";

// if this is enabled, proxyequal mutates state with an additional property
spreadGuardsEnabled(false);

export function compareChanges(changes, affected) {
  const queue = [];
  queue.push({ changes, affected });

  while (queue.length > 0) {
    const item = queue.pop();
    const entries = item.changes;

    for (let i = 0, len = entries.length; i < len; i++) {
      const entry = entries[i];
      const key = entry.key;
      const affectedValue = item.affected[key];

      if (affectedValue === true) return true;
      if (affectedValue !== undefined) {
        const nextChanges = entry.changes;

        if (nextChanges === true) return true;
        queue.push({
          changes: nextChanges,
          affected: affectedValue
        });
      }
    }
  }

  return false;
}

function createAffectedKeysIndex(affected) {
  const affectedStateKeys = {};
  for (let i = 0, len = affected.length; i < len; i++)
    mutateSet(affectedStateKeys, affected[i], true);
  return affectedStateKeys;
}

export function trackChanges(state, select) {
  const trappedState = proxyState(state);
  const selectedState = select(trappedState.state);
  trappedState.seal(); // this doesn't seem to remove the extra prop
  const affected = trappedState.affected;
  const deproxified = deproxify(selectedState);
  const finalState = deproxified !== undefined ? deproxified : selectedState;

  return {
    finalState,
    affected: createAffectedKeysIndex(affected)
  };
}

export function calculateChangesIndex(patches) {
  const stage1 = {};
  for (let i = 0, len = patches.length; i < len; i++)
    mutateSetA(stage1, patches[i].path, true);

  // precompute object walk so Object.keys is called the least amount necessary
  const stage2 = [];
  const queue = [];
  queue.push({ keys: Object.keys(stage1), changes: stage1, out: stage2 });

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
          keys: Object.keys(changes),
          changes,
          out: nextChanges
        });
        item.out.push({ key, changes: nextChanges });
      }
    }
  }

  return stage2;
}
