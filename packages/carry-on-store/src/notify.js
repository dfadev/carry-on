/** @format **/
export default function notify() {
  const listeners = [];

  function subscribe(fn) {
    const idx = listeners.push(fn);
    return () => listeners.splice(idx - 1, 1);
  }

  function notifySubscribers(state, dispatch, query) {
    listeners.map(listener => listener(state, dispatch, query));
  }

  const plugin = {
    dispatch: ({ dispatch, query }) =>
      function notifyListeners(action, type, ...args) {
        const state = dispatch(action, type, ...args);
        notifySubscribers(state, dispatch, query);
        return state;
      }
  };

  return {
    listeners,
    subscribe,
    plugin
  };
}
