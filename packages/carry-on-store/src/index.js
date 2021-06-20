import { enableAllPlugins, setAutoFreeze } from "immer";

enableAllPlugins();
setAutoFreeze(false);

export {
  deleteStore,
  initStores,
  getStore,
  register,
  connect,
  subscribe,
  watchGet,
  initMessageType,
  debugStore,
  debugStores
} from "./store";
export { compareChanges, calculateChanges } from "./changeTracking";
export { watch, Watch } from "./watch";
export { default as notify } from "./notify";
export { default as devTools } from "./devtools";
export { default as transaction } from "./transaction";
export { default as set } from "./set";
export { default as get } from "./get";
