/** @format **/
export default () => {
  const listeners = [];

  function subscribe(fn) {
    const idx = listeners.push(fn);
    return () => listeners.splice(idx - 1, 1);
  }

  function notifyListeners(state, dispatch, query) {
    listeners.map(listener => listener(state, dispatch, query));
  }

  const plugin = {
    dispatch: ({ dispatch, query }) => (action, type, ...args) => {
      const state = dispatch(action, type, ...args);
      notifyListeners(state, dispatch, query);
      return state;
    }
  };

  return {
    listeners,
    subscribe,
    plugin
  };
};
