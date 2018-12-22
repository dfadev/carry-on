/** @format **/
import {
  isFunction,
  isEqual,
  debouncePromise,
  getIn,
  mutateSet,
  makeCancelable,
  mutateMerge
} from "carry-on-utils";

export default (
  { id = "form", init = {}, onValidate, onSubmit, onReset } = {
    init: {},
    id: "form"
  }
) => ({
  state: ({ dispatch, query }) => {
    let cancellable;
    const debounceValidate = onValidate
      ? debouncePromise(onValidate({ dispatch, query }), 200)
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
          const setErrors = form.setErrors;

          cancellable && cancellable();
          cancellable = makeCancelable(
            debounceValidate(form.values),
            errorInfo => setErrors(errorInfo) && onSuccess && onSuccess(),
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
          const pristine = calcPristine(form);
          if (pristine !== form.isPristine) form.isPristine = pristine;
          form.validate(state);
        }, "Set Field Value" + typeSuffix),

      setValues: values =>
        dispatch(state => {
          const form = getIn(state, id);
          form.values = values;
          const pristine = calcPristine(form);
          if (pristine !== form.isPristine) form.isPristine = pristine;
          form.validate(state);
        }, "Set Values" + typeSuffix),

      setFieldError: (fieldName, error) =>
        dispatch(state => {
          mutateSet(getIn(state, id).errors, fieldName, error);
        }, "Set Field Error" + typeSuffix),

      setErrors: ({ errors, isValid, merge = true }) =>
        dispatch(state => {
          const form = getIn(state, id);

          if (merge) mutateMerge(form.errors, errors);
          else form.errors = errors;

          form.isValid = isValid;
          form.isValidating = false;
        }, "Set Errors" + typeSuffix),

      setFieldTouched: (fieldName, touched) =>
        dispatch(state => {
          mutateSet(getIn(state, id).touched, fieldName, touched);
        }, "Set Field Touched" + typeSuffix),

      setTouched: (touched, merge = true) =>
        dispatch(state => {
          const form = getIn(state, id);
          if (merge)
            mutateMerge(form.touched, touched);
          else
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
    const stage2 = mutateSet({}, id, stage1);
    const form = getIn(stage2, id);
    form.origState = { ...stage1 };
    return stage2;
  }
});
