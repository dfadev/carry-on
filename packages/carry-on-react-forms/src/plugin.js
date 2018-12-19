/** @format **/
import {
  isFunction,
  isEqual,
  debouncePromise,
  getIn,
  setIn,
  makeCancelable
} from "carry-on-utils";

const isValidatingKey = ".isValidating";
const valuesKey = ".values.";
const errorsKey = ".errors.";
const errorsFieldKey = ".errors";
const touchedKey = ".touched.";
const touchedFieldKey = ".touched";
const isValidKey = ".isValid";
const isSubmittingKey = ".isSubmitting";
const isPristineKey = ".isPristine";
const origStateKey = ".origState";

export default (
  { id = "form", init = {}, validate, onSubmit, onReset } = {
    init: {},
    id: "form"
  }
) => ({
  state: ({ dispatch, query }) => {
    let cancellable;
    const debounceValidate = validate
      ? debouncePromise(validate({ dispatch, query }), 200)
      : undefined;

    const typeSuffix = " (" + id + ")";

    const calcPristine = state => {
      const formState = getIn(state, id);
      return setIn(
        state,
        id + isPristineKey,
        isEqual(formState.origState.values, formState.values)
      );
    };

    const stage1 = {
      touched: {},
      errors: {},
      isPristine: true,
      isSubmitting: false,
      isValidating: false,
      isValid: true,
      validation: undefined,
      values: isFunction(init) ? init({ dispatch, query }) : init,

      validate: (state, onSuccess) => {
        if (debounceValidate) {
          const nextState = setIn(state, id + isValidatingKey, true);
          cancellable && cancellable();
          cancellable = makeCancelable(
            debounceValidate(getIn(nextState, id).values),
            vals =>
              getIn(state, id).setErrors(vals) && onSuccess && onSuccess(),
            () => {
              dispatch(
                curState => setIn(curState, id + isValidatingKey, false),
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
        query(state => getIn(getIn(state, id).errors, fieldName, false)),

      isTouched: fieldName =>
        query(state => getIn(getIn(state, id).touched, fieldName, false)),

      setFieldValue: (fieldName, value) =>
        dispatch(
          state =>
            getIn(state, id).validate(
              calcPristine(setIn(state, id + valuesKey + fieldName, value))
            ),
          "Set Field Value" + typeSuffix
        ),

      setValues: values =>
        dispatch(
          state =>
            getIn(state, id).validate(
              calcPristine(setIn(state, id + valuesKey, values))
            ),
          "Set Values" + typeSuffix
        ),

      setFieldError: (fieldName, error) =>
        dispatch(
          state => setIn(state, id + errorsKey + fieldName, error),
          "Set Field Error" + typeSuffix
        ),

      setErrors: errors =>
        dispatch(state => {
          let validatedState = setIn(state, id + errorsFieldKey, errors);
          const isValid = Object.keys(errors).length === 0;
          validatedState = setIn(validatedState, id + isValidKey, isValid);
          return setIn(validatedState, id + isValidatingKey, false);
        }, "Set Errors" + typeSuffix),

      setFieldTouched: (fieldName, touched) =>
        dispatch(
          state => setIn(state, id + touchedKey + fieldName, touched),
          "Set Field Touched" + typeSuffix
        ),

      setTouched: touched =>
        dispatch(
          state => setIn(state, id + touchedKey, touched),
          "Set Touched" + typeSuffix
        ),

      reset: e => {
        e && e.preventDefault();
        const s = dispatch(state => {
          const formState = getIn(state, id);
          const origState = formState.origState;
          const newFormState = {
            ...formState,
            ...origState,
            origState
          };
          return setIn(state, id, newFormState);
        }, "Reset Form" + typeSuffix);
        const realOnReset = onReset && onReset({ dispatch, query });
        realOnReset && realOnReset(query(q => getIn(q, id + valuesKey)));
        return s;
      },

      submit: e => {
        e && e.preventDefault();
        if (
          query(
            state =>
              getIn(state, id).isValidating || getIn(state, id).isSubmitting
          )
        )
          return;

        const finishSubmit = () => {
          const realOnSubmit = onSubmit && onSubmit({ dispatch, query });

          Promise.resolve(
            realOnSubmit && realOnSubmit(query(q => getIn(q, id).values))
          )
            .then(rslt => {
              dispatch(curState => {
                const submittedState = setIn(
                  curState,
                  id + isSubmittingKey,
                  false
                );
                if (rslt) {
                  let validSubmitState = setIn(
                    submittedState,
                    id + isPristineKey,
                    true
                  );
                  validSubmitState = setIn(
                    validSubmitState,
                    id + errorsFieldKey,
                    {}
                  );
                  validSubmitState = setIn(
                    validSubmitState,
                    id + touchedFieldKey,
                    {}
                  );
                  validSubmitState = setIn(
                    validSubmitState,
                    id + origStateKey,
                    undefined
                  );
                  validSubmitState = setIn(
                    validSubmitState,
                    id + origStateKey,
                    getIn(validSubmitState, id)
                  );
                  return validSubmitState;
                }
                return submittedState;
              }, "End Submit" + typeSuffix);
            })
            .catch(() =>
              dispatch(curState => setIn(curState, id + isSubmittingKey, false))
            );
        };

        const beginSubmitState = dispatch(state => {
          let nextState = setIn(state, id + isSubmittingKey, true);
          nextState = getIn(nextState, id).validate(nextState, finishSubmit);
          return nextState;
        }, "Begin Submit" + typeSuffix);

        if (!getIn(beginSubmitState, id).isValidating) finishSubmit();
      }
    };
    const stage2 = setIn({}, id, stage1);
    return setIn(stage2, id + origStateKey, stage1);
  }
});
