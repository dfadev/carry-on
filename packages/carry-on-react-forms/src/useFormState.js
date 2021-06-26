import { useContext } from "react";
import { getStore } from "carry-on-store";
import FormContext from "./FormContext";
import FieldContext from "./FieldContext";

const useFormState = ({
  from,
  store: propStore = from,
  form: propForm
} = {}) => {
  const { form = propForm || "form", store = propStore } =
    useContext(FormContext) || {};
  const { prefix } = useContext(FieldContext) || {};

  const s = getStore(store);
  const get = !form ? s.get : (fn, opts) => s.get(fn, { path: form, ...opts });
  const set = !form ? s.set : (fn, opts) => s.set(fn, { path: form, ...opts });
  const pathedStore = { get, set, id: store, path: form };

  return { form, store: pathedStore, prefix };
};

export default useFormState;
