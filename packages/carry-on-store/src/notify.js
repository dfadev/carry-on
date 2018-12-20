/** @format **/
export default function notify() {
  const subscribers = [];

  function subscribe(fn) {
    const idx = subscribers.push(fn);
    return () => subscribers.splice(idx - 1, 1);
  }

  function notifySubscribers(state, dispatch, query) {
    function callSubscriber(subscriber) {
      return subscriber(state, dispatch, query);
    }
    subscribers.map(callSubscriber);
  }

  const plugin = {
    dispatch: ({ dispatch, query }) =>
      function notifyMiddleware(action, type, ...args) {
        const state = dispatch(action, type, ...args);
        notifySubscribers(state, dispatch, query);
        return state;
      }
  };

  return {
    subscribers,
    subscribe,
    plugin
  };
}
