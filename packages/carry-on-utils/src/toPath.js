// adapt lodash toPath

/** Used to match property names within property paths. */
const reLeadingDot = /^\./;
const rePropName =
  /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
const reEscapeChar = /\\(\\)?/g;

export default function toPath(string) {
  const result = [];
  if (reLeadingDot.test(string)) {
    result.push("");
  }
  string.replace(rePropName, (match, number, quote, str) => {
    result.push(quote ? str.replace(reEscapeChar, "$1") : number || match);
  });

  return result;
}
