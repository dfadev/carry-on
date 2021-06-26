import { useContext } from "react";
import { useCarryOn } from "carry-on-react";
import { getStore } from "carry-on-store";
import FormContext from "./FormContext";
import FieldContext from "./FieldContext";

const useForm = (opts, optional = {}) => {
  opts = typeof opts === "function" ? { select: opts, ...optional } : opts;

  const { store, form } = useContext(FormContext);
  const { prefix } = useContext(FieldContext) || {};

  const s = getStore(store);
  const get = !form ? s.get : (fn, o) => s.get(fn, { path: form, ...o });
  const set = !form ? s.set : (fn, o) => s.set(fn, { path: form, ...o });
  const pathedStore = { get, set, id: store, path: form };

  const [storeState] = useCarryOn({
    from: store,
    path: form,
    ...opts
  });

  return { state: storeState, store: pathedStore, prefix };
};

export default useForm;
