/** @format **/
import { createContext } from "react";
import makeStoreModule from "carry-on-store";
import makeStateComponents from "./State";
import makeStoreComponents from "./Store";

const core = makeStoreModule(undefined, () => ({ Context: createContext({}) }));
const state = makeStateComponents(core);
const store = makeStoreComponents(core);

export const deleteStore = core.deleteStore;
export const register = core.register;
export const State = state.State;
export const withState = state.withState;
export const Store = store.Store;
export const withStore = store.withStore;

export const ContextState = state.ContextState;
export const withContextState = state.withContextState;
export const ContextStore = store.ContextStore;
export const withContextStore = store.withContextStore;
