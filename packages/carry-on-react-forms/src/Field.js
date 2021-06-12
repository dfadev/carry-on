/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-newline */
import React from "react";
import { getIn } from "carry-on-utils";
import FormState from "./FormState";

function getVal({ target: { type, value, checked } }) {
  if (type === "number" || type === "range") {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? "" : parsed;
  }

  if (type === "checkbox" || type === "radio") return checked;

  return value;
}

export default ({
  path = "",
  default: def,
  children = () => null,
  type,
  ...rest
}) => (
  <FormState id={path} {...rest}>
    {({
      values,
      touched,
      errors,
      visited,
      setFieldValue,
      hasVisited,
      isTouched,
      setFieldVisited,
      setFieldTouched,
      setFieldError
    } = {}) =>
      children({
        touched: getIn(touched, path, false),
        error: getIn(errors, path, undefined),
        visited: getIn(visited, path, false),
        element: {
          onFocus: () => !hasVisited(path) && setFieldVisited(path, true),
          onChange: e => setFieldValue(path, getVal(e)),
          onBlur: () => !isTouched(path) && setFieldTouched(path, true),
          [type === "checkbox" || type === "radio" ? "checked" : "value"]:
            getIn(values, path, def)
        },
        setValue: val => setFieldValue(path, val),
        setVisited: val => setFieldVisited(path, val),
        setTouched: val => setFieldTouched(path, val),
        setError: val => setFieldError(path, val)
      })
    }
  </FormState>
);
