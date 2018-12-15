/** @format **/
import { get, isEqualWith } from "lodash";
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

        validate: (state, onSuccess) => {
          if (onValidate) {
            const nextState = setIn(state, "form.isValidating", true);
            const { form, ...validationValues } = nextState;
            cancellable && cancellable();
            cancellable = makeCancelable(
              debounceValidate(validationValues),
              vals => state.form.setErrors(vals) && onSuccess(),
              () => {
                dispatch(curState =>
                  setIn(curState, "form.isValidating", false)
                );
                onSuccess();
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

        reset(e) {
          e && e.preventDefault();
          const s = dispatch(() => origState, "Reset Form");
          onReset && onReset(s);
          return s;
        },

        submit(e) {
          e && e.preventDefault();
          if (
            query(state => state.form.isValidating || state.form.isSubmitting)
          )
            return;

          dispatch(state => {
            let nextState = setIn(state, "form.isSubmitting", true);
            const finishSubmit = () => {
              const { form, ...submitValues } = query();
              Promise.resolve(onSubmit(submitValues))
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
        }
      }
    })
  };
};
