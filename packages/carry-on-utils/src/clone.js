export default function clone(value) {
  if (Array.isArray(value)) return value.slice();
  const type = typeof value;

  if (type === "number") return value;
  if (type === "string") return value;
  if (value instanceof Object) return { ...value };

  return value;
}
