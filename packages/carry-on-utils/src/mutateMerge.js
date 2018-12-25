function keys(object) {
  return object ? Object.getOwnPropertyNames(object) : [];
}

function forOwn(object, iteratee) {
  for (const key of keys(object))
    if (iteratee(object[key], key) === false) break;
  return object;
}

function forEach(collection, iteratee) {
  if (Array.isArray(collection)) {
    for (let i = 0, l = collection.length; i < l; ++i)
      if (iteratee(collection[i], i) === false) break;
  } else {
    forOwn(collection, iteratee);
  }
  return collection;
}

function clone(value) {
  if (Array.isArray(value))
    return value.slice();

  if (value instanceof Object)
    return Object.assign({}, value);

  return value;
}

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
