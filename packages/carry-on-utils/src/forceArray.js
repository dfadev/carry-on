/** @format **/
export default function forceArray(thing) {
  return Array.isArray(thing) ? thing : [thing];
}
