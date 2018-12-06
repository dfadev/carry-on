/** @format **/
import makeStoreModule from "./core";
import makeStateComponents from "./State";
import makeStoreComponents from "./Store";

const core = makeStoreModule();
const state = makeStateComponents(core);
const store = makeStoreComponents(core);

export const deleteStore = core.deleteStore;
export const register = core.register;
export const State = state.State;
export const withState = state.withState;
export const Store = store.Store;
export const withStore = store.withStore;
