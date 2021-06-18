import { isString } from "carry-on-utils";
import { getStore } from "./store";

export default function get(fn, id, opts) {
  if (isString(fn)) {
    const actualId = fn;
    fn = id;
    id = actualId;
  }

  const store = getStore(id);
  return store.get(fn, opts);
}
