/** @format **/

export default ({ timeTravel = true } = {}) => {
  // dev tools connections
  const connections = [],
    subscriptions = [],
    // time travel state tracking (only for immutable state)
    time = {},
    // check for dev tools extension
    devTools = window && window.__REDUX_DEVTOOLS_EXTENSION__;

  if (!devTools) return {};

  return {
    dispatch: ({ dispatch, id }) => (action, type = "Dispatch", ...args) => {
      const state = dispatch(action, type, ...args);

      // exit when no action
      if (!action) return state;
      const name = id;

      let connection = connections[name];
      if (!connection)
        connection = connections[name] = devTools.connect({ name });

      // support time traveling
      if (timeTravel) {
        const states = time[name] || (time[name] = []);
        states.push(state);
        subscriptions[name] ||
          (subscriptions[name] = connection.subscribe(
            msg =>
              msg.type === "DISPATCH" &&
              msg.payload &&
              msg.payload.type === "JUMP_TO_STATE" &&
              dispatch(() => states[msg.payload.index], "Time Travel", true)
          ));
      }

      // send devtools an state update message
      connection.send({ type }, state);

      return state;
    }
  };
};
