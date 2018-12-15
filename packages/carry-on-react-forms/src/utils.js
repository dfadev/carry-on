import { isEmpty, setWith, isString, isNumber, clone } from "lodash";

export function setIn(state, path, valueToSet) {
  if (isEmpty(path)) return valueToSet;
  return setWith({ ...state }, path, valueToSet, (nsValue, key) => {
    const nextKey = path[path.lastIndexOf(key) + 1];
    const isStringNumber = isString(nextKey) && isNumber(parseInt(nextKey, 10));
    const result = isStringNumber ? Object(nsValue) : nsValue;
    return clone(result);
  });
}

export function makeCancelable(promise, onfulfilled, onrejected) {
  let hasCanceled = false;
  new Promise((resolve, reject) =>
    promise
      .then(val => (hasCanceled ? reject({ isCanceled: true }) : resolve(val)))
      .catch(err => (hasCanceled ? reject({ isCanceled: true }) : reject(err)))
  )
    .then(onfulfilled)
    .catch(err => {
      if (err && !err.isCanceled) {
        throw err;
      }
    })
    .catch(onrejected);
  return function cancel() {
    hasCanceled = true;
  };
}
