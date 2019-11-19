/** @format **/
export default function clone(value) {
  if (Array.isArray(value)) return value.slice();

  if (value instanceof Object) return { ...value };

  return value;
}
