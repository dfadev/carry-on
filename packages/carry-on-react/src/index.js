/** @format **/
import { makeStoreModule } from "carry-on-store";
import makeStateComponents from "./State";

const core = makeStoreModule();
const state = makeStateComponents(core);

export const deleteStore = core.deleteStore;
export const register = core.register;
export const State = state.State;
export const withState = state.withState;
