/** @format **/
import { isString } from "carry-on-utils";
import { getStore } from "./store";

export default function set(fn, id) {
  if (isString(fn)) {
    const actualId = fn;
    fn = id;
    id = actualId;
  }

  const store = getStore(id);
  if (!store) throw new Error("store does not exist");
  if (!store.set) throw new Error("store not connected");
  store.set(fn);
}
