/** @format **/

export default ({ timeTravel = true } = {}) => {
  // dev tools subscriptions
  const subscriptions = [],
    // time travel state tracking (only for immutable state)
    time = {},
    // check for dev tools extension
    devTools = window && window.__REDUX_DEVTOOLS_EXTENSION__;

  return {
    id: "devTools",
    dispatch: dispatch => (action, type = "Dispatch", ...args) => {
      const state = dispatch(action, type, ...args);

      // exit when no action
      if (!action) return state;
      const name = state.id;

      // support time traveling
      if (timeTravel) {
        const states = time[name] || (time[name] = []);
        states.push(state);
        subscriptions[name] ||
          (subscriptions[name] = devTools
            .connect({ name })
            .subscribe(
              msg =>
                msg.type === "DISPATCH" &&
                msg.payload &&
                msg.payload.type === "JUMP_TO_STATE" &&
                dispatch(() => states[msg.payload.index], "Time Travel", true)
            ));
      }

      // send devtools an state update message
      devTools.send({ type }, state, { name });

      return state;
    }
  };
};
