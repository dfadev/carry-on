/** @format **/
import { isString } from "carry-on-utils";
import { getStore } from "./store";

export default function get(fn, id) {
  if (isString(fn)) {
    const actualId = fn;
    fn = id;
    id = actualId;
  }

  return getStore(id).get(fn);
}

