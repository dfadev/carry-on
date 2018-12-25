/** @format **/
export default function toPath(key) {
  if (key === null || key === undefined || !key.length) return [];

  if (typeof key !== "string") throw new Error("key must be string");

  return key.split(/[.[\]]+/).filter(Boolean);
}
