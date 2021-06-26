import { useCarryOn } from "carry-on-react";
import { getIn } from "carry-on-utils";
import useFormState from "./useFormState";

function getVal({ target: { type, value, checked } }) {
  if (type === "number" || type === "range") {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? "" : parsed;
  }

  if (type === "checkbox" || type === "radio") return checked;

  return value;
}

const useField = ({
  form: propForm,
  from,
  store: propStore = from,
  path = "field",
  type = "text",
  readOnly = false,
  default: def,
  ...opts
}) => {
  const { form, store, prefix } = useFormState({
    store: propStore,
    form: propForm
  });

  const [storeState] = useCarryOn({
    from: store.id,
    path: form,
    ...opts,
    select: ({
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
    } = {}) => {
      const prefixedPath = path;

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
        onFocus: () =>
          !readOnly &&
          !hasVisited(prefixedPath) &&
          setFieldVisited(prefixedPath, true),
        onBlur: () =>
          !readOnly &&
          !isTouched(prefixedPath) &&
          setFieldTouched(prefixedPath, true),
        type
      };

      if (type !== "button") {
        element.onChange = e =>
          !readOnly && setFieldValue(prefixedPath, getVal(e));
        element.name = fieldId;
        element[valueAttributeName] = value;
      }

      return [
        {
          touched: getIn(touched, path, false),
          error: getIn(errors, path, undefined),
          visited: getIn(visited, path, false),
          element,
          readOnly,
          setValue: val => !readOnly && setFieldValue(prefixedPath, val),
          setVisited: val => !readOnly && setFieldVisited(prefixedPath, val),
          setTouched: val => !readOnly && setFieldTouched(prefixedPath, val),
          setError: val => !readOnly && setFieldError(prefixedPath, val),
          form
        },
        store,
        prefix
      ];
    }
  });

  return storeState;
};

export default useField;
