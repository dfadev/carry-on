/** @format **/
// is the thing a string
export default function isString(thing) {
  return typeof thing === "string" || thing instanceof String;
}
