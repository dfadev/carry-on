// is the thing a function
export const isFunction = thing =>
  !!(thing && thing.constructor && thing.call && thing.apply);

// from lodash
const reEscapeChar = /\\(\\)?/g;
const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

function stringToPath(string) {
  const result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push("");
  }
  string.replace(rePropName, (match, number, quote, subString) => {
    result.push(
      quote ? subString.replace(reEscapeChar, "$1") : number || match
    );
  });
  return result;
}

// from formik
export function getIn(obj, key, def, p = 0) {
  const path = stringToPath(key);
  while (obj && p < path.length) {
    obj = obj[path[p++]];
  }
  return obj === undefined ? def : obj;
}
