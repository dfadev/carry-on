/** @format **/
import toPath from "./toPath";

export default function getIn(state, complexKey, def) {
  // Intentionally using iteration rather than recursion
  const path = toPath(complexKey);
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
