import keys from "./keys";

export function forOwn(object, iteratee) {
  for (let i = 0, ks = keys(object), len = ks.length; i < len; i += 1) {
    const key = ks[i];
    const val = object[key];
    const result = iteratee(val, key);
    if (result === false) break;
  }

  return object;
}

export default function forEach(collection, iteratee) {
  if (Array.isArray(collection)) {
    for (let i = 0, len = collection.length; i < len; i += 1)
      if (iteratee(collection[i], i) === false) break;
  } else {
    forOwn(collection, iteratee);
  }
  return collection;
}
