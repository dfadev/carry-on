/** @format **/
import get from "lodash/get";
import isEqualWith from "lodash/isEqualWith";
import isEmpty from "lodash/isEmpty";
import setWith from "lodash/setWith";
import isString from "lodash/isString";
import isNumber from "lodash/isNumber";
import clone from "lodash/clone";

function setIn(state, path, valueToSet) {
  if (isEmpty(path)) return valueToSet;
  return setWith({ ...state }, path, valueToSet, (nsValue, key) => {
    const nextKey = path[path.lastIndexOf(key) + 1];
    const isStringNumber = isString(nextKey) && isNumber(parseInt(nextKey, 10));
    const result = isStringNumber ? Object(nsValue) : nsValue;
    return clone(result);
  });
}

export default (onSubmit, onReset) => {
  let origState;

  const triggerValidation = state => state;

  const calcPristine = state =>
    setIn(
      state,
      "form.isPristine",
      isEqualWith(
        origState,
        state,
        (value1, value2, key) => (key === "form" ? true : undefined)
      )
    );

  return {
    dispatch: ({ dispatch }) => (action, type, ...args) => {
      const state = dispatch(action, type, ...args);
      if (type === "Initialize") origState = state;

      return state;
    },
    state: ({ dispatch, query }) => ({
      form: {
        touched: {},
        errors: {},
        isPristine: true,
        isSubmitting: false,
        isValidating: false,
        isValid: true,
        validation: undefined,

        hasError: fieldName =>
          query(state => get(state.form.errors, fieldName, false)),

        isTouched: fieldName =>
          query(state => get(state.form.touched, fieldName, false)),

        setFieldValue: (fieldName, value) =>
          dispatch(
            state =>
              triggerValidation(calcPristine(setIn(state, fieldName, value))),
            "Set Field Value"
          ),

        setValues: values =>
          dispatch(
            state => triggerValidation(calcPristine({ ...state, ...values })),
            "Set Values"
          ),

        setFieldError: (fieldName, error) =>
          dispatch(
            state => setIn(state, "form.errors." + fieldName, error),
            "Set Field Error"
          ),

        setErrors: errors =>
          dispatch(state => setIn(state, "form.errors", errors), "Set Errors"),

        setFieldTouched: (fieldName, touched) =>
          dispatch(
            state =>
              triggerValidation(
                setIn(state, "form.touched." + fieldName, touched)
              ),
            "Set Field Touched"
          ),

        setTouched: touched =>
          dispatch(
            state => triggerValidation(setIn(state, "form.touched", touched)),
            "Set Touched"
          ),

        reset(e) {
          e && e.preventDefault();
          const s = dispatch(() => origState, "Reset Form");
          onReset && onReset(s);
          return s;
        },

        submit(e) {
          e && e.preventDefault();
          dispatch(state => {
            const rslt = onSubmit && onSubmit(state);
            if (rslt) {
              const nextState = setIn(state, "form.isPristine", true);
              origState = nextState;
              return nextState;
            }
            return state;
          }, "Submit Form");
        }
      }
    })
  };
};
