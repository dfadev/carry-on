/* eslint-disable react/jsx-curly-newline */
import React from "react";
import { getIn } from "carry-on-utils";
import FormState from "./FormState";

function getVal({ target: { type, value, checked } }) {
  if (type === "number" || type === "range") {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? "" : parsed;
  }

  if (type === "checkbox") return checked;

  return value;
}

export default ({
  path = "field",
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
        store.id !== undefined ? store.id : "default"
      }.${formId}.${path}`;

      let value = getIn(values, path, def);
      const valueAttributeName = type === "checkbox" ? "checked" : "value";

      if (value === undefined || value === null) {
        if (type === "checkbox") value = false;
        else if (type === "date" || type === "time") value = null;
        else if (type === "button" || type === "reset" || type === "submit")
          value = undefined;
        else value = "";
      }

      const element = {
        id: fieldId,
        name: fieldId,
        onFocus: () => !hasVisited(path) && setFieldVisited(path, true),
        onChange: e => setFieldValue(path, getVal(e)),
        onBlur: () => !isTouched(path) && setFieldTouched(path, true),
        type,
        [valueAttributeName]: value
      };

      if (type === "button") delete element.name;

      return children(
        {
          touched: getIn(touched, path, false),
          error: getIn(errors, path, undefined),
          visited: getIn(visited, path, false),
          element,
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
