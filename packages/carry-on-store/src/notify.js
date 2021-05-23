import { compareChanges } from "./changeTracking";

export default function notify() {
  const subscribers = new Map();

  function subscribe(fn, watch) {
    subscribers.set(fn, watch);
    return function unsusbscribe() {
      subscribers.delete(fn);
    };
  }

  const plugin = {
    middleware: ({ next, getChanges, wrap, isNested }) =>
      function notifyMiddleware(action, type, opts, ...args) {
        const state = next(action, type, opts, ...args);
        if (isNested()) return state; // don't notify on nested sets

        const changes = getChanges && getChanges();

        const notifySubs = () => {
          const notifyThese = [];
          const entries = subscribers.entries();
          let entry = entries.next();
          while (!entry.done) {
            const [fn, watch] = entry.value;
            if (watch === undefined) notifyThese.push(fn);
            else {
              const hasChanges = compareChanges(changes, watch);
              if (hasChanges) notifyThese.push(fn);
            }
            entry = entries.next();
          }

          for (let i = 0, len = notifyThese.length; i < len; i += 1)
            notifyThese[i](state, changes);
        };

        if (opts && opts.immediate) notifySubs();
        else wrap(notifySubs);

        return state;
      },
    dispose: () => {
      subscribers.clear();
    }
  };

  return {
    subscribers,
    subscribe,
    plugin
  };
}
