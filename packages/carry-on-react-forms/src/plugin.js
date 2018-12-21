/** @format **/
import {
  isFunction,
  isEqual,
  debouncePromise,
  getIn,
  setIn,
  mutateSet,
  makeCancelable
} from "carry-on-utils";

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

    const calcPristine = form => isEqual(form.origState.values, form.values);

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
          const form = getIn(state, id);
          form.isValidating = true;

          cancellable && cancellable();
          cancellable = makeCancelable(
            debounceValidate(form.values),
            vals => form.setErrors(vals) && onSuccess && onSuccess(),
            () => {
              dispatch(
                curState => (getIn(curState, id).isValidating = false),
                "Validation Threw" + typeSuffix
              );
              onSuccess && onSuccess();
            }
          );
        }
      },

      hasError: fieldName =>
        query(state => getIn(getIn(state, id).errors, fieldName, false)),

      isTouched: fieldName =>
        query(state => getIn(getIn(state, id).touched, fieldName, false)),

      setFieldValue: (fieldName, value) =>
        dispatch(state => {
          const form = getIn(state, id);
          mutateSet(form.values, fieldName, value);
          form.isPristine = calcPristine(form);
          form.validate(state);
        }, "Set Field Value" + typeSuffix),

      setValues: values =>
        dispatch(state => {
          const form = getIn(state, id);
          form.values = values;
          form.isPristine = calcPristine(form);
          form.validate(state);
        }, "Set Values" + typeSuffix),

      setFieldError: (fieldName, error) =>
        dispatch(state => {
          mutateSet(getIn(state, id).errors, fieldName, error);
        }, "Set Field Error" + typeSuffix),

      setErrors: errors =>
        dispatch(state => {
          const form = getIn(state, id);
          form.errors = errors;
          form.isValid = Object.keys(errors).length === 0;
          form.isValidating = false;
        }, "Set Errors" + typeSuffix),

      setFieldTouched: (fieldName, touched) =>
        dispatch(state => {
          mutateSet(getIn(state, id).touched, fieldName, touched);
        }, "Set Field Touched" + typeSuffix),

      setTouched: touched =>
        dispatch(state => {
          const form = getIn(state, id);
          form.touched = touched;
        }, "Set Touched" + typeSuffix),

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
          mutateSet(state, id, newFormState);
        }, "Reset Form" + typeSuffix);
        const realOnReset = onReset && onReset({ dispatch, query });
        realOnReset && realOnReset(query(q => getIn(q, id).values));
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
                const form = getIn(curState, id);
                form.isSubmitting = false;
                if (rslt) {
                  form.isPristine = true;
                  form.errors = {};
                  form.touched = {};
                  form.origState = undefined;
                  form.origState = { ...form };
                }
              }, "End Submit" + typeSuffix);
            })
            .catch(() =>
              dispatch(curState => {
                const form = getIn(curState, id);
                form.isSubmitting = false;
                return curState;
              })
            );
        };

        const beginSubmitState = dispatch(state => {
          const form = getIn(state, id);
          form.isSubmitting = true;
          form.validate(state, finishSubmit);
        }, "Begin Submit" + typeSuffix);

        if (!getIn(beginSubmitState, id).isValidating) finishSubmit();
      }
    };
    const stage2 = setIn({}, id, stage1);
    return setIn(stage2, id + ".origState", stage1);
    //const stage2 = {};
    //mutateSet(stage2, id, stage1);
    //return mutateSet(getIn(stage2, id).origState, { ...stage1 });
  }
});
