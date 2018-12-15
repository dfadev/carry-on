/** @format **/
import React from "react";
import { State } from "carry-on-react";
import { get } from "lodash";

function getVal({ target: { type, value, checked } }) {
  if (/number|range/.test(type)) {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? "" : parsed;
  }

  if (/checkbox/.test(type)) {
    return checked;
  }

  return value;
}

export default ({ from, path, select, default: def, children, checkbox }) => (
  <State
    select={state => ({
      setFieldValue: state.form.setFieldValue,
      isTouched: state.form.isTouched,
      setFieldTouched: state.form.setFieldTouched,
      setFieldError: state.form.setFieldError,
      value: select
        ? select(get(state.form.values, path, def))
        : get(state.form.values, path, def),
      touched: get(state.form.touched, path, false),
      error: get(state.form.errors, path, undefined)
    })}
    from={from}
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
          value: checkbox ? undefined : value,
          onChange: e => setFieldValue(path, getVal(e)),
          onBlur: () => !isTouched(path) && setFieldTouched(path, true),
          checked: checkbox ? Boolean(value) : undefined
        },
        setValue: val => setFieldValue(path, val),
        setTouched: val => setFieldTouched(path, val),
        setError: val => setFieldError(path, val)
      })
    }
  </State>
);
