import { forEach, clone } from "micro-dash";

export default function mutateMerge(object, ...sources) {
  for (const source of sources) {
    forEach(source, (value, key) => {
      const myValue = object[key];
      // original micro-dash tries to clone functions
      if (myValue instanceof Object && typeof myValue !== "function") {
        value = mutateMerge(clone(myValue), value);
      }
      object[key] = value;
    });
  }
  return object;
}
