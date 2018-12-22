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
    middleware: ({ dispatch, getChanges }) =>
      function notifyMiddleware(action, type, ...args) {
        const state = dispatch(action, type, ...args);
        const changes = getChanges();

        for (let i = 0; i < subscribers.length; i++)
          subscribers[i](state, changes);

        return state;
      }
  };

  return {
    subscribers,
    subscribe,
    plugin
  };
}
