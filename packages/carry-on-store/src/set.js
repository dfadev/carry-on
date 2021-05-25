import { isString } from "carry-on-utils";
import { getStore } from "./store";

export default function set(fn, id, ...args) {
  if (isString(fn)) {
    const actualId = fn;
    fn = id;
    id = actualId;
  }

  const store = getStore(id);
  if (!store) throw new Error("store does not exist");
  store.set(fn, ...args);
}
