import { forceArray, isString } from "carry-on-utils";
import { register } from "./store";

export const state = (init, id, path, dispose) => {
  // storeId can be the first parameter
  if (isString(init)) {
    const actualId = init;
    init = id;
    id = actualId;
  }

  const inits = forceArray(init).map(item => ({
    state: item,
    dispose
  }));

  register(inits, id, path);
};

export const middleware = (init, id, path, dispose) => {
  // storeId can be the first parameter
  if (isString(init)) {
    const actualId = init;
    init = id;
    id = actualId;
  }

  const inits = forceArray(init).map(item => ({
    middleware: item,
    dispose
  }));

  register(inits, id, path);
};
