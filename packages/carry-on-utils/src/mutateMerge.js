/** @format **/
import forEach from "./forEach";
import clone from "./clone";

export default function mutateMerge(object, ...sources) {
  for (const source of sources) {
    forEach(source, (value, key) => {
      const myValue = object[key];
      // original micro-dash tries to clone functions
      if (myValue instanceof Object && typeof myValue !== "function") {
        value = mutateMerge(clone(myValue), value);
      }
      // don't assign if we don't need to
      if (object[key] !== value) object[key] = value;
    });
  }
  return object;
}
