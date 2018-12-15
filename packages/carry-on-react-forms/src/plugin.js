/** @format **/
import get from "lodash/get";
import isEqualWith from "lodash/isEqualWith";
import debounce from "debounce-promise";
import { setIn, makeCancelable } from "./utils";

export default (onSubmit, onReset, onValidate) => {
  let origState;

  const debounceValidate = debounce(onValidate, 200);
  let cancellable;

  const calcPristine = state =>
    setIn(
      state,
      "form.isPristine",
      isEqualWith(origState, state, (value1, value2, key) =>
        key === "form" ? true : undefined
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

        validate: state => {
          if (onValidate) {
            const nextState = setIn(state, "form.isValidating", true);
            const { form, ...validationValues } = nextState;
            cancellable && cancellable();
            cancellable = makeCancelable(
              debounceValidate(validationValues),
              vals => {
                dispatch(curState => {
                  let validatedState = setIn(curState, "form.errors", vals);
                  const isValid = Object.keys(vals).length === 0;
                  validatedState = setIn(
                    validatedState,
                    "form.isValid",
                    isValid
                  );
                  return setIn(validatedState, "form.isValidating", false);
                }, "Validation Completed");
              },
              err => {
                dispatch(curState =>
                  setIn(curState, "form.isValidating", false)
                );
              }
            );
            return nextState;
          }
          return state;
        },

        hasError: fieldName =>
          query(state => get(state.form.errors, fieldName, false)),

        isTouched: fieldName =>
          query(state => get(state.form.touched, fieldName, false)),

        setFieldValue: (fieldName, value) =>
          dispatch(
            state =>
              state.form.validate(calcPristine(setIn(state, fieldName, value))),
            "Set Field Value"
          ),

        setValues: values =>
          dispatch(
            state => state.form.validate(calcPristine({ ...state, ...values })),
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
            state => setIn(state, "form.touched." + fieldName, touched),
            "Set Field Touched"
          ),

        setTouched: touched =>
          dispatch(
            state => setIn(state, "form.touched", touched),
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
          if (query(state => state.form.isValidating)) {
            return;
          }

          dispatch(state => {
            const rslt = onSubmit && onSubmit(state);
            if (rslt) {
              let nextState = setIn(state, "form.isPristine", true);
              nextState = setIn(nextState, "form.errors", {});
              nextState = setIn(nextState, "form.touched", {});
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
