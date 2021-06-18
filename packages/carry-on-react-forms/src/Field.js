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
  type = "text",
  ...rest
}) => (
  <FormState id={path} {...rest}>
    {(form, store) => {
      const {
        formId,
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
      } = form || {};

      const fieldId = `${
        store !== undefined ? store : "default"
      }.${formId}.${path}`;

      let value = getIn(values, path, def);
      let valueAttributeName;

      if (type === "checkbox" || type === "radio") {
        valueAttributeName = "checked";
        if (value === undefined || value === null) value = false;
      } else {
        valueAttributeName = "value";
        if (value === undefined || value === null) value = "";
      }

      return children(
        {
          touched: getIn(touched, path, false),
          error: getIn(errors, path, undefined),
          visited: getIn(visited, path, false),
          element: {
            id: fieldId,
            name: fieldId,
            onFocus: () => !hasVisited(path) && setFieldVisited(path, true),
            onChange: e => setFieldValue(path, getVal(e)),
            onBlur: () => !isTouched(path) && setFieldTouched(path, true),
            type,
            [valueAttributeName]: value
          },
          setValue: val => setFieldValue(path, val),
          setVisited: val => setFieldVisited(path, val),
          setTouched: val => setFieldTouched(path, val),
          setError: val => setFieldError(path, val),
          form
        },
        store
      );
    }}
  </FormState>
);
