/** @format **/
import { getIn, mutateSet } from "carry-on-utils";

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

export function createAffectedKeysIndex(path, affected) {
  const affectedStateKeys = {};
  mutateSet(affectedStateKeys, path, {});
  const prefix = getIn(affectedStateKeys, path);

  for (let i = 0; i < affected.length; i++)
    mutateSet(prefix, affected[i], true);

  return affectedStateKeys;
}
