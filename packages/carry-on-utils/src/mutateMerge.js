import forEach from "./forEach";
import clone from "./clone";

export default function mutateMerge(object, ...sources) {
  for (let i = 0; i < sources.length; i += 1) {
    const source = sources[i];
    forEach(source, (value, key) => {
      const myValue = object[key];
      // original micro-dash tries to clone functions
      if (myValue instanceof Object && typeof myValue !== "function") {
        value = mutateMerge(clone(myValue), value);
      }
      // assign undefined to maybe sparse array
      if (value === undefined && Array.isArray(object)) object[key] = value;
      // don't assign if we don't need to, assign undefined to maybe sparse array
      else if (object[key] !== value) object[key] = value;
    });
  }
  return object;
}

export function mutateMergeStrip(object, ...sources) {
  for (let i = 0; i < sources.length; i += 1) {
    const source = sources[i];
    forEach(source, (value, key) => {
      const myValue = object[key];
      const myValueType = typeof myValue;
      const sourceValueType = typeof value;
      // original micro-dash tries to clone functions
      if (myValue instanceof Object && myValueType !== "function") {
        value = mutateMergeStrip(clone(myValue), value);
      }
      // assign undefined to maybe sparse array
      if (value === undefined && Array.isArray(object)) object[key] = value;
      // don't assign if we don't need to, assign undefined to maybe sparse array
      else if (
        object[key] !== value &&
        myValueType !== "function" &&
        sourceValueType !== "function"
      )
        object[key] = value;
    });
  }
  return object;
}
