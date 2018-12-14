/** @format **/
import React from "react";
import { State } from "carry-on-react";
import get from "lodash/get";

export default ({ from, path, select, default: def, children }) => (
  <State
    select={state => ({
      setFieldValue: state.form.setFieldValue,
      isTouched: state.form.isTouched,
      setFieldTouched: state.form.setFieldTouched,
      setFieldError: state.form.setFieldError,
      value: select ? select(get(state, path, def)) : get(state, path, def),
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
          value,
          onChange: e => setFieldValue(path, e.target.value),
          onBlur: () => !isTouched(path) && setFieldTouched(path, true)
        },
        setValue: val => setFieldValue(path, val),
        setTouched: val => setFieldTouched(path, val),
        setError: val => setFieldError(path, val)
      })
    }
  </State>
);
