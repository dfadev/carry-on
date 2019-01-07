/** @format **/
import toPath from "./toPath";

// Originally from micro-dash
export function update(object, path, updater) {
  if (object && path.length) {
    let current = object;
    const length = path.length;
    for (let i = 0; i < length; ++i) {
      const key = path[i];
      let value = current[key];
      if (i < length - 1) {
        if (!(value instanceof Object)) {
          value = Number.isInteger(path[i + 1]) ? [] : {};
        }
      } else {
        value = updater(value);
      }

      // micro-dash always assigned, causing issue with proxy object
      if (current[key] !== value) current[key] = value;
      current = value;
    }
  }
  return object;
}

function constant(value) {
  return () => value;
}

export default function mutateSet(obj, path, val) {
  return update(obj, toPath(path), constant(val));
}

export function mutateSetA(obj, path, val) {
  return update(obj, path, constant(val));
}
