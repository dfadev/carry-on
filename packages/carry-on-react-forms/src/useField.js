import { useContext } from "react";
import { useCarryOn } from "carry-on-react";
import { getIn } from "carry-on-utils";
import FormContext from "./FormContext";

function getVal({ target: { type, value, checked } }) {
  if (type === "number" || type === "range") {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? "" : parsed;
  }

  if (type === "checkbox" || type === "radio") return checked;

  return value;
}

const useField = ({ path, type, default: def, ...opts }) => {
  const { store, form } = useContext(FormContext);
  const [storeState] = useCarryOn({
    from: store,
    path: form,
    ...opts,
    select: ({
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
      console.log(path);
      return {
        touched: getIn(touched, path, false),
        error: getIn(errors, path, undefined),
        visited: getIn(visited, path, false),
        element: {
          onFocus: () => !hasVisited(path) && setFieldVisited(path, true),
          onChange: e => setFieldValue(path, getVal(e)),
          onBlur: () => !isTouched(path) && setFieldTouched(path, true),
          [type === "checkbox" || type === "radio"
            ? "checked"
            : "value"]: getIn(values, path, def)
        },
        setValue: val => setFieldValue(path, val),
        setVisited: val => setFieldVisited(path, val),
        setTouched: val => setFieldTouched(path, val),
        setError: val => setFieldError(path, val)
      };
    }
  });

  return storeState;
};

export default useField;
