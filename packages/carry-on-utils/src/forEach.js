/** @format **/
import keys from "./keys";

export function forOwn(object, iteratee) {
  for (const key of keys(object))
    if (iteratee(object[key], key) === false) break;
  return object;
}

export default function forEach(collection, iteratee) {
  if (Array.isArray(collection)) {
    for (let i = 0, l = collection.length; i < l; ++i)
      if (iteratee(collection[i], i) === false) break;
  } else {
    forOwn(collection, iteratee);
  }
  return collection;
}
