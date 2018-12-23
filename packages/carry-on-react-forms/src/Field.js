/** @format **/
import React from "react";
import { State } from "carry-on-react";
import { getIn } from "carry-on-utils";

function getVal({ target: { type, value, checked } }) {
  if (type === "number" || type === "range") {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? "" : parsed;
  }

  if (type === "checkbox" || type === "radio") return checked;

  return value;
}

export default ({
  store,
  form = "form",
  path,
  default: def,
  children,
  type,
  ...rest
}) => (
  <State path={form} from={store} {...rest}>
    {({
      values,
      touched,
      errors,
      setFieldValue,
      isTouched,
      setFieldTouched,
      setFieldError
    }) =>
      children({
        touched: getIn(touched, path, false),
        error: getIn(errors, path, undefined),
        element: {
          onChange: e => setFieldValue(path, getVal(e)),
          onBlur: () => !isTouched(path) && setFieldTouched(path, true),
          [type === "checkbox" || type === "radio"
            ? "checked"
            : "value"]: getIn(values, path, def)
        },
        setValue: val => setFieldValue(path, val),
        setTouched: val => setFieldTouched(path, val),
        setError: val => setFieldError(path, val)
      })
    }
  </State>
);
