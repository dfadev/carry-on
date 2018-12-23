/** @format **/
export default function devTools({ timeTravel = true } = {}) {
  // dev tools connections
  const connections = [],
    subscriptions = [],
    // time travel state tracking (only for immutable state)
    time = {},
    // check for dev tools extension
    devToolsExt = window && window.__REDUX_DEVTOOLS_EXTENSION__;

  if (!devToolsExt) return {};

  return {
    middleware: ({ dispatch, id }) =>
      function devToolsMiddleware(action, type = "Dispatch", ...args) {
        const state = dispatch(action, type, ...args);

        // exit when no action
        if (!action) return state;
        const name = id;

        let connection = connections[name];
        if (!connection)
          connection = connections[name] = devToolsExt.connect({ name });

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
                dispatch(s => {
                  if (s === undefined) s = {};
                  const keys = Object.keys(s);
                  for (let i = 0, len = keys.length; i < len; i++)
                    delete s[keys[i]];
                  return Object.assign(s, states[msg.payload.index]);
                }, "Time Travel")
            ));
        }

        // send devtools an state update message
        connection.send({ type }, state);

        return state;
      }
  };
}
