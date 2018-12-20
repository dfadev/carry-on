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
    dispatch: ({ dispatch, query }) =>
      function notifyMiddleware(action, type, ...args) {
        const state = dispatch(action, type, ...args);
        for (let i = 0; i < subscribers.length; i++) {
          subscribers[i](state, dispatch, query);
        }
        return state;
      }
  };

  return {
    subscribers,
    subscribe,
    plugin
  };
}
