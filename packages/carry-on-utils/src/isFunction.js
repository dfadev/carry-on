/** @format **/
// is the thing a function
export default function isFunction(thing) {
  return !!(thing && thing.constructor && thing.call && thing.apply);
}
