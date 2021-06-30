import { getIn } from "carry-on-utils";

const eventHandler = (handler, id, value, store) => e => {
  if (!handler) return;
  let realHandler = handler;
  if (typeof handler === "string") realHandler = getIn(store.get(), handler);
  if (realHandler)
    realHandler(e, {
      id,
      value,
      get: store.get,
      set: store.set
    });
};

export default eventHandler;
