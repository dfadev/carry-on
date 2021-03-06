import { keys, isEqual } from "carry-on-utils";

export default function devTools({ timeTravel = true } = {}) {
  // check for dev tools extension
  /* eslint-disable no-underscore-dangle */
  const devToolsExt = window && window.__REDUX_DEVTOOLS_EXTENSION__;
  /* eslint-enable */

  if (!devToolsExt) return {};

  // dev tools connections
  const connections = {};
  const subscriptions = {};
  // time travel state tracking (only for immutable state)
  const time = {};

  return {
    priority: Number.NEGATIVE_INFINITY,
    middleware: ({ next, set, id, isNested }) =>
      function devToolsMiddleware(action, opts) {
        const state = next(action, opts);
        const type = opts && (opts.type || opts);

        // exit when no action
        if (!action) return state;

        // prevent infinite loop
        if (type === "Time Travel") return state;

        const name = id;

        let connection = connections[name];
        if (!connection)
          /* eslint-disable-next-line no-multi-assign */
          connection = connections[name] = devToolsExt.connect({ name });

        // support time traveling
        if (timeTravel) {
          const states = time[name] || (time[name] = []);
          if (isNested()) {
            // can't save nested state because it'll be revoked by the parent
            // so just use the last state for now
            const len = states.length;
            const idx = len - 1;
            const lastState = idx > -1 ? states[idx] : undefined;
            states.push(lastState);
          } else states.push(state);

          if (!subscriptions[name])
            subscriptions[name] = connection.subscribe(
              msg =>
                msg.type === "DISPATCH" &&
                msg.payload &&
                msg.payload.type === "JUMP_TO_STATE" &&
                set(s => {
                  const keyList = keys(s);
                  const tt = states[msg.payload.index];
                  const ttKeys = keys(tt);

                  for (let i = 0, len = keyList.length; i < len; i += 1) {
                    const key = keyList[i];
                    if (!ttKeys.includes(key)) delete s[key];
                  }

                  for (let i = 0, len = ttKeys.length; i < len; i += 1) {
                    const key = ttKeys[i];
                    const oldVal = s[key];
                    const newVal = tt[key];
                    if (!isEqual(oldVal, newVal)) s[key] = newVal;
                  }

                  return s;
                }, "Time Travel")
            );
        }

        // send devtools an state update message
        connection.send({ type }, state);

        return state;
      },

    dispose: () => {
      const subscriptionKeys = Object.keys(subscriptions);
      for (let i = 0, len = subscriptionKeys.length; i < len; i += 1) {
        const key = subscriptionKeys[i];
        subscriptions[key]();
        delete subscriptions[key];
        delete connections[key];
      }
    }
  };
}
