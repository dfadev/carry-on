/** @format **/
import { isEqual } from "carry-on-utils";

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
    middleware: ({ set, id }) =>
      function devToolsMiddleware(action, type = "Set", ...args) {
        const state = set(action, type, ...args);

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
                set(s => {
                  if (s === undefined) s = {};
                  const keys = Object.keys(s);
                  const tt = states[msg.payload.index];
                  const ttKeys = Object.keys(tt);

                  for (let i = 0, len = keys.length; i < len; i++) {
                    const key = keys[i];
                    if (!ttKeys.includes(key)) delete s[key];
                  }

                  for (let i = 0, len = ttKeys.length; i < len; i++) {
                    const key = ttKeys[i];
                    const oldVal = s[key];
                    const newVal = tt[key];
                    if (!isEqual(oldVal, newVal)) s[key] = newVal;
                  }

                  return s;
                }, "Time Travel")
            ));
        }

        // send devtools an state update message
        connection.send({ type }, state);

        return state;
      }
  };
}
