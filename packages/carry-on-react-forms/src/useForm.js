import { useContext } from "react";
import { useCarryOn } from "carry-on-react";
import FormContext from "./FormContext";

const useForm = (opts, optional = {}) => {
  opts = typeof opts === "function" ? { select: opts, ...optional } : opts;

  const { store, form } = useContext(FormContext);
  const [storeState] = useCarryOn({
    from: store,
    path: form,
    ...opts
  });

  return storeState;
};

export default useForm;
