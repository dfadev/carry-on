/** @format **/
export default function notify() {
  const subscribers = [];

  function subscribe(fn) {
    const idx = subscribers.push(fn);
    return function unsusbscribe() {
      subscribers.splice(idx - 1, 1);
    };
  }

  const plugin = {
    middleware: ({ set, getChanges, wrap }) =>
      function notifyMiddleware(action, type, opts, ...args) {
        const state = set(action, type, opts, ...args);
        const changes = getChanges();

        const notifySubs = () => {
          for (let i = 0; i < subscribers.length; i++)
            subscribers[i](state, changes);
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
