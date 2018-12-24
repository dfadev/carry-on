/** @format **/
import {
  isFunction,
  isEqual,
  debouncePromise,
  getIn,
  getInA,
  mutateSet,
  makeCancelable,
  mutateMerge,
  toPath
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

    const idPath = toPath(id);

    const calcPristine = form => isEqual(form.origState.values, form.values);

    const stage1 = {
      visited: {},
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
          const form = getInA(state, idPath);
          form.isValidating = true;
          const setErrors = form.setErrors;

          cancellable && cancellable();
          cancellable = makeCancelable(
            debounceValidate(form.values),
            errorInfo => setErrors(errorInfo) && onSuccess && onSuccess(),
            () => {
              dispatch(
                curState => (getInA(curState, idPath).isValidating = false),
                "Validation Threw" + typeSuffix
              );
              onSuccess && onSuccess();
            }
          );
        }
      },

      hasError: fieldName =>
        query(state => getIn(getInA(state, idPath).errors, fieldName, false)),

      hasVisited: fieldName =>
        query(state => getIn(getInA(state, idPath).visited, fieldName, false)),

      isTouched: fieldName =>
        query(state => getIn(getInA(state, idPath).touched, fieldName, false)),

      setFieldValue: (fieldName, value) =>
        dispatch(state => {
          const form = getInA(state, idPath);
          mutateSet(form.values, fieldName, value);
          const pristine = calcPristine(form);
          if (pristine !== form.isPristine) form.isPristine = pristine;
          form.validate(state);
        }, "Set Field Value" + typeSuffix),

      setValues: values =>
        dispatch(state => {
          const form = getInA(state, idPath);
          if (form.values !== values) form.values = values;
          const pristine = calcPristine(form);
          if (pristine !== form.isPristine) form.isPristine = pristine;
          form.validate(state);
        }, "Set Values" + typeSuffix),

      setFieldError: (fieldName, error) =>
        dispatch(state => {
          mutateSet(getInA(state, idPath).errors, fieldName, error);
        }, "Set Field Error" + typeSuffix),

      setErrors: ({ errors, isValid, merge = true }) =>
        dispatch(state => {
          const form = getInA(state, idPath);

          if (merge) mutateMerge(form.errors, errors);
          else form.errors = errors;

          if (form.isValid !== isValid) form.isValid = isValid;

          if (form.isValidating) form.isValidating = false;
        }, "Set Errors" + typeSuffix),

      setFieldVisited: (fieldName, visited) =>
        dispatch(state => {
          mutateSet(getInA(state, idPath).visited, fieldName, visited);
        }, "Set Field Visited" + typeSuffix),

      setFieldTouched: (fieldName, touched) =>
        dispatch(state => {
          mutateSet(getInA(state, idPath).touched, fieldName, touched);
        }, "Set Field Touched" + typeSuffix),

      setTouched: (touched, merge = true) =>
        dispatch(state => {
          const form = getInA(state, idPath);
          if (merge) mutateMerge(form.touched, touched);
          else form.touched = touched;
        }, "Set Touched" + typeSuffix),

      reset: e => {
        e && e.preventDefault();
        const s = dispatch(state => {
          const formState = getInA(state, idPath);
          const origState = formState.origState;
          const newFormState = {
            ...formState,
            ...origState,
            origState
          };
          mutateSet(state, id, newFormState);
        }, "Reset Form" + typeSuffix);
        const realOnReset = onReset && onReset({ dispatch, query });
        realOnReset && realOnReset(query(q => getInA(q, idPath).values));
        return s;
      },

      submit: e => {
        e && e.preventDefault();
        if (
          query(state => {
            const form = getInA(state, idPath);
            return form.isValidating || form.isSubmitting;
          })
        )
          return;

        const finishSubmit = () => {
          const realOnSubmit = onSubmit && onSubmit({ dispatch, query });

          Promise.resolve(
            realOnSubmit && realOnSubmit(query(q => getInA(q, idPath).values))
          )
            .then(rslt => {
              dispatch(curState => {
                const form = getInA(curState, idPath);
                form.isSubmitting = false;
                if (rslt) {
                  if (!form.isPristine) form.isPristine = true;
                  if (Object.keys(form.errors).length > 0) form.errors = {};
                  if (Object.keys(form.visited).length > 0) form.visited = {};
                  if (Object.keys(form.touched).length > 0) form.touched = {};
                  form.origState = undefined;
                  form.origState = { ...form };
                }
              }, "End Submit" + typeSuffix);
            })
            .catch(() =>
              dispatch(curState => {
                const form = getInA(curState, idPath);
                if (form.isSubmitting) form.isSubmitting = false;
                return curState;
              })
            );
        };

        const beginSubmitState = dispatch(state => {
          const form = getInA(state, idPath);
          form.isSubmitting = true;
          form.validate(state, finishSubmit);
        }, "Begin Submit" + typeSuffix);

        if (!getInA(beginSubmitState, idPath).isValidating) finishSubmit();
      }
    };

    const stage2 = mutateSet({}, id, stage1);
    const form = getInA(stage2, idPath);
    form.origState = { ...stage1 };
    return stage2;
  }
});
