/** @format **/
import toPath from "./toPath";

export function getInA(state, path, def) {
  let current = state;
  for (let i = 0; i < path.length; i++) {
    const key = path[i];
    if (
      current === undefined ||
      current === null ||
      typeof current !== "object" ||
      (Array.isArray(current) && Number.isNaN(key))
    ) {
      return def;
    }
    current = current[key];
  }
  return current === undefined ? def : current;
}

export default function getIn(state, complexKey, def) {
  const path = toPath(complexKey);
  return getInA(state, path, def);
}