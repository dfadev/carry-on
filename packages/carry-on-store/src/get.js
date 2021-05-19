/** @format **/
import { isString } from "carry-on-utils";
import { getStore } from "./store";

export default function get(fn, id) {
  if (isString(fn)) {
    const actualId = fn;
    fn = id;
    id = actualId;
  }

  const store = getStore(id);
  if (!store) throw new Error("no store name");
  if (!store.get) throw new Error("store not connected");
  return store.get(fn);
}
