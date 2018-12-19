/** @format **/
import React from "react";
import { State } from "carry-on-react";
import { get } from "./utils";

function getVal({ target: { type, value, checked } }) {
  if (type === "number" || type === "range") {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? "" : parsed;
  }

  if (type === "checkbox") return checked;

  return value;
}

export default ({
  store,
  form = "form",
  path,
  select,
  default: def,
  children,
  type,
  throttle,
  debounce
}) => (
  <State
    path={form}
    select={state => ({
      setFieldValue: state.setFieldValue,
      isTouched: state.isTouched,
      setFieldTouched: state.setFieldTouched,
      setFieldError: state.setFieldError,
      value: select
        ? select(get(state.values, path, def))
        : get(state.values, path, def),
      touched: get(state.touched, path, false),
      error: get(state.errors, path, undefined)
    })}
    from={store}
    throttle={throttle}
    debounce={debounce}
  >
    {({
      value,
      touched,
      error,
      setFieldValue,
      isTouched,
      setFieldTouched,
      setFieldError
    }) =>
      children({
        touched,
        error,
        element: {
          onChange: e => setFieldValue(path, getVal(e)),
          onBlur: () => !isTouched(path) && setFieldTouched(path, true),
          [type === "checkbox" ? "checked" : "value"]: value
        },
        setValue: val => setFieldValue(path, val),
        setTouched: val => setFieldTouched(path, val),
        setError: val => setFieldError(path, val)
      })
    }
  </State>
);
