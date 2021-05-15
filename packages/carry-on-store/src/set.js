/** @format **/
import { isString } from "carry-on-utils";
import { getStore } from "./store";

export default function set(fn, id) {
  if (isString(fn)) {
    const actualId = fn;
    fn = id;
    id = actualId;
  }

  getStore(id).set(fn);
}
