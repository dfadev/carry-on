/** @format **/
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
    middleware: ({ set, getChanges, wrap }) =>
      function notifyMiddleware(action, type, opts, ...args) {
        const state = set(action, type, opts, ...args);
        const changes = getChanges && getChanges();

        const notifySubs = () => {
          for (const item of subscribers.entries()) {
            const [fn, watch] = item;
            if (watch === undefined) fn(state, changes);
            else {
              const hasChanges = compareChanges(changes, watch);
              if (hasChanges) fn(state, changes);
            }
          }
        };

        if (!wrap || (opts && opts.immediate)) notifySubs();
        else wrap(notifySubs);

        return state;
      }
  };

  return {
    subscribers,
    subscribe,
    plugin
  };
}
