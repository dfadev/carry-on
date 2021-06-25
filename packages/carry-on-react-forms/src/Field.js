/* eslint-disable react/jsx-curly-newline */
import React from "react";
import { getIn } from "carry-on-utils";
import FormState from "./FormState";
import FieldContext from "./FieldContext";

function getVal({ target: { type, value, checked } }) {
  if (type === "number" || type === "range") {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? "" : parsed;
  }

  if (type === "checkbox") return checked;

  return value;
}

const Field = ({
  path = "field",
  default: def,
  children = () => null,
  type = "text",
  readOnly = false,
  ...rest
}) => (
  <FormState id={path} {...rest}>
    {(form, store, prefix) => {
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

      const prefixedPath = !prefix ? path : `${prefix}.${path}`;

      const fieldId = `${
        store.id !== undefined ? store.id : "default"
      }.${formId}.${prefixedPath}`;

      let value = getIn(values, prefixedPath, def);
      const valueAttributeName = type === "checkbox" ? "checked" : "value";

      if (value === undefined || value === null) {
        if (type === "checkbox") value = false;
        else if (type === "date" || type === "time") value = null;
        else if (type === "button" || type === "reset" || type === "submit")
          value = undefined;
        else value = "";
      }

      if (readOnly && typeof readOnly === "function")
        readOnly = readOnly(form, store, prefix);

      const element = {
        id: fieldId,
        name: fieldId,
        onFocus: () =>
          !readOnly && !hasVisited(prefixedPath) && setFieldVisited(prefixedPath, true),
        onChange: e => !readOnly && setFieldValue(prefixedPath, getVal(e)),
        onBlur: () =>
          !readOnly && !isTouched(prefixedPath) && setFieldTouched(prefixedPath, true),
        type,
        [valueAttributeName]: value
      };

      if (type === "button") delete element.name;

      return (
        <FieldContext.Provider value={{ prefix: prefixedPath }}>
          {children(
            {
              touched: getIn(touched, prefixedPath, false),
              error: getIn(errors, prefixedPath, undefined),
              visited: getIn(visited, prefixedPath, false),
              element,
              readOnly,
              setValue: val => !readOnly && setFieldValue(prefixedPath, val),
              setVisited: val =>
                !readOnly && setFieldVisited(prefixedPath, val),
              setTouched: val =>
                !readOnly && setFieldTouched(prefixedPath, val),
              setError: val => !readOnly && setFieldError(prefixedPath, val),
              form
            },
            store,
            prefix
          )}
        </FieldContext.Provider>
      );
    }}
  </FormState>
);

export default Field;
