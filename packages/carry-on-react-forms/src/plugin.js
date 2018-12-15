/** @format **/
import { get, isEqual, memoize } from "lodash";
import debounce from "debounce-promise";
import { setIn, makeCancelable } from "./utils";

export default ({ init, validate } = {}) => {
  let origState;

  const debounceValidate = debounce(validate, 200);
  let cancellable;

  const calcPristine = state =>
    setIn(
      state,
      "form.isPristine",
      isEqual(origState.form.values, state.form.values)
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
        values: init,

        validate: (state, onSuccess) => {
          if (validate) {
            const nextState = setIn(state, "form.isValidating", true);
            cancellable && cancellable();
            cancellable = makeCancelable(
              debounceValidate(nextState.form.values),
              vals => state.form.setErrors(vals) && onSuccess && onSuccess(),
              () => {
                dispatch(curState =>
                  setIn(curState, "form.isValidating", false)
                );
                onSuccess && onSuccess();
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
              state.form.validate(
                calcPristine(setIn(state, "form.values." + fieldName, value))
              ),
            "Set Field Value"
          ),

        setValues: values =>
          dispatch(
            state =>
              state.form.validate(
                calcPristine(setIn(state, "form.values", values))
              ),
            "Set Values"
          ),

        setFieldError: (fieldName, error) =>
          dispatch(
            state => setIn(state, "form.errors." + fieldName, error),
            "Set Field Error"
          ),

        setErrors: errors =>
          dispatch(state => {
            let validatedState = setIn(state, "form.errors", errors);
            const isValid = Object.keys(errors).length === 0;
            validatedState = setIn(validatedState, "form.isValid", isValid);
            return setIn(validatedState, "form.isValidating", false);
          }, "Set Errors"),

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

        reset: memoize(onReset => e => {
          e && e.preventDefault();
          const s = dispatch(() => origState, "Reset Form");
          onReset && onReset(s);
          return s;
        }),

        submit: memoize(onSubmit => e => {
          e && e.preventDefault();
          if (
            query(state => state.form.isValidating || state.form.isSubmitting)
          )
            return;

          dispatch(state => {
            let nextState = setIn(state, "form.isSubmitting", true);
            const finishSubmit = () => {
              Promise.resolve(onSubmit(query(q => q.form.values)))
                .then(rslt => {
                  dispatch(curState => {
                    const submittedState = setIn(
                      curState,
                      "form.isSubmitting",
                      false
                    );
                    if (rslt) {
                      let validSubmitState = setIn(
                        submittedState,
                        "form.isPristine",
                        true
                      );
                      validSubmitState = setIn(
                        validSubmitState,
                        "form.errors",
                        {}
                      );
                      validSubmitState = setIn(
                        validSubmitState,
                        "form.touched",
                        {}
                      );
                      origState = validSubmitState;
                      return validSubmitState;
                    }
                    return submittedState;
                  }, "End Submit");
                })
                .catch(() =>
                  dispatch(curState =>
                    setIn(curState, "form.isSubmitting", false)
                  )
                );
            };

            nextState = nextState.form.validate(nextState, finishSubmit);
            if (nextState.form.isValidating) return nextState;
            finishSubmit();
            return nextState;
          }, "Begin Submit");
        })
      }
    })
  };
};
