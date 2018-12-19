/** @format **/
import {
  isFunction,
  isEqual,
  debounce,
  get,
  setIn,
  makeCancelable
} from "./utils";

export default (
  { id = "form", init = {}, validate, onSubmit, onReset } = {
    init: {},
    id: "form"
  }
) => {
  const typeSuffix = " (" + id + ")";
  let origState;

  const debounceValidate = debounce(validate, 200);
  let cancellable;

  const calcPristine = state =>
    setIn(
      state,
      id + ".isPristine",
      isEqual(origState.values, get(state, id).values)
    );

  return {
    dispatch: ({ dispatch }) => (action, type, ...args) => {
      const state = dispatch(action, type, ...args);
      if (type === "Initialize") origState = get(state, id);

      return state;
    },
    state: store => {
      const { dispatch, query } = store;
      const data = {
        touched: {},
        errors: {},
        isPristine: true,
        isSubmitting: false,
        isValidating: false,
        isValid: true,
        validation: undefined,
        values: isFunction(init) ? init(store) : init,

        validate: (state, onSuccess) => {
          if (validate) {
            const nextState = setIn(state, id + ".isValidating", true);
            cancellable && cancellable();
            cancellable = makeCancelable(
              debounceValidate(get(nextState, id).values),
              vals =>
                get(state, id).setErrors(vals) && onSuccess && onSuccess(),
              () => {
                dispatch(
                  curState => setIn(curState, id + ".isValidating", false),
                  "Validation Threw" + typeSuffix
                );
                onSuccess && onSuccess();
              }
            );
            return nextState;
          }
          return state;
        },

        hasError: fieldName =>
          query(state => get(get(state, id).errors, fieldName, false)),

        isTouched: fieldName =>
          query(state => get(get(state, id).touched, fieldName, false)),

        setFieldValue: (fieldName, value) =>
          dispatch(
            state =>
              get(state, id).validate(
                calcPristine(setIn(state, id + ".values." + fieldName, value))
              ),
            "Set Field Value" + typeSuffix
          ),

        setValues: values =>
          dispatch(
            state =>
              get(state, id).validate(
                calcPristine(setIn(state, id + ".values", values))
              ),
            "Set Values" + typeSuffix
          ),

        setFieldError: (fieldName, error) =>
          dispatch(
            state => setIn(state, id + ".errors." + fieldName, error),
            "Set Field Error" + typeSuffix
          ),

        setErrors: errors =>
          dispatch(state => {
            let validatedState = setIn(state, id + ".errors", errors);
            const isValid = Object.keys(errors).length === 0;
            validatedState = setIn(validatedState, id + ".isValid", isValid);
            return setIn(validatedState, id + ".isValidating", false);
          }, "Set Errors" + typeSuffix),

        setFieldTouched: (fieldName, touched) =>
          dispatch(
            state => setIn(state, id + ".touched." + fieldName, touched),
            "Set Field Touched" + typeSuffix
          ),

        setTouched: touched =>
          dispatch(
            state => setIn(state, id + ".touched", touched),
            "Set Touched" + typeSuffix
          ),

        reset: e => {
          e && e.preventDefault();
          const s = dispatch(
            state => setIn(state, id, origState),
            "Reset Form" + typeSuffix
          );
          const realOnReset = onReset && onReset(s);
          realOnReset && realOnReset(s);
          return s;
        },

        submit: e => {
          e && e.preventDefault();
          if (
            query(
              state =>
                get(state, id).isValidating || get(state, id).isSubmitting
            )
          )
            return;

          const finishSubmit = () => {
            const realOnSubmit = onSubmit && query(state => onSubmit(state));

            Promise.resolve(
              realOnSubmit && realOnSubmit(query(q => get(q, id).values))
            )
              .then(rslt => {
                dispatch(curState => {
                  const submittedState = setIn(
                    curState,
                    id + ".isSubmitting",
                    false
                  );
                  if (rslt) {
                    let validSubmitState = setIn(
                      submittedState,
                      id + ".isPristine",
                      true
                    );
                    validSubmitState = setIn(
                      validSubmitState,
                      id + ".errors",
                      {}
                    );
                    validSubmitState = setIn(
                      validSubmitState,
                      id + ".touched",
                      {}
                    );
                    origState = get(validSubmitState, id);
                    return validSubmitState;
                  }
                  return submittedState;
                }, "End Submit" + typeSuffix);
              })
              .catch(() =>
                dispatch(curState =>
                  setIn(curState, id + ".isSubmitting", false)
                )
              );
          };

          const beginSubmitState = dispatch(state => {
            let nextState = setIn(state, id + ".isSubmitting", true);
            nextState = get(nextState, id).validate(nextState, finishSubmit);
            return nextState;
          }, "Begin Submit" + typeSuffix);

          if (!get(beginSubmitState, id).isValidating) finishSubmit();
        }
      };
      return setIn({}, id, data);
    }
  };
};
