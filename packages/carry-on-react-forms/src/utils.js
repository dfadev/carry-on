//import { cloneDeep, toPath } from "lodash";
////import toPath from "lodash";

//// is the thing a function
//export const isFunction = thing =>
  //!!(thing && thing.constructor && thing.call && thing.apply);

//// is the thing an integer?
//export const isInteger = thing =>
  //String(Math.floor(Number(thing))) === thing;

//// from lodash
////const reEscapeChar = /\\(\\)?/g;
////const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

////function stringToPath(string) {
  ////if (string === undefined) debugger;
  ////const result = [];
  ////if (string.charCodeAt(0) === 46 [> . <]) {
    ////result.push("");
  ////}
  ////string.replace(rePropName, (match, number, quote, subString) => {
    ////result.push(
      ////quote ? subString.replace(reEscapeChar, "$1") : number || match
    ////);
  ////});
  ////return result;
////}

//// from formik
//export function getIn(obj, key, def, p = 0) {
  //const path = toPath(key);
  //while (obj && p < path.length) {
    //obj = obj[path[p++]];
  //}
  //return obj === undefined ? def : obj;
//}

/**
 * Deeply set a value from in object via it's path.
 * @see https://github.com/developit/linkstate
 */
//export function setIn(obj, path, value) {
  //const res = {};
  //let resVal = res;
  //let i = 0;
  //const pathArray = toPath(path);

  //for (; i < pathArray.length - 1; i++) {
    //const currentPath = pathArray[i];
    //const currentObj = getIn(obj, pathArray.slice(0, i + 1));

    //if (resVal[currentPath]) {
      //resVal = resVal[currentPath];
    //} else if (currentObj) {
      //resVal = resVal[currentPath] = cloneDeep(currentObj);
    //} else {
      //const nextPath: string = pathArray[i + 1];
      //resVal = resVal[currentPath] =
        //isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
    //}
  //}

  //// Return original object if new value is the same as current
  //if ((i === 0 ? obj : resVal)[pathArray[i]] === value) {
    //return obj;
  //}

  //if (value === undefined) {
    //delete resVal[pathArray[i]];
  //} else {
    //resVal[pathArray[i]] = value;
  //}

  //const result = { ...obj, ...res };

  //// If the path array has a single element, the loop did not run.
  //// Deleting on `resVal` had no effect in this scenario, so we delete on the result instead.
  //if (i === 0 && value === undefined) {
    //delete result[pathArray[i]];
  //}

  //return result;
//}
