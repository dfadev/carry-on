import {
  isFunction,
  isEqual,
  debouncePromise,
  getIn,
  getInA,
  mutateSet,
  makeCancelable,
  mutateMerge,
  toPath,
  keys
} from "carry-on-utils";

export default ({ id, initialValues, onValidate, onSubmit, onReset }) => ({
  state: ({ id: storeId, set, get }) => {
    const curForm = () => get() || {};

    let cancellable;

    if (onValidate === undefined) {
      const formStateOnValidate = curForm().onValidate;
      if (formStateOnValidate !== undefined)
        onValidate = () => formStateOnValidate;
    }

    const debounceValidate = onValidate
      ? debouncePromise(onValidate({ set, get, id: storeId }), 200)
      : undefined;

    const typeSuffix = storeId ? ` (${storeId}:${id})` : ` (${id})`;

    const calcPristine = form => isEqual(form.origState.values, form.values);

    if (initialValues === undefined)
      initialValues = curForm().initialValues || {};

    const stage1 = {
      formId: id,
      submitCount: 0,
      visited: {},
      touched: {},
      errors: {},
      isPristine: true,
      isSubmitting: false,
      isValidating: false,
      isValid: true,
      values: isFunction(initialValues)
        ? initialValues({ set, get, id: storeId })
        : initialValues,

      validate: (form, onSuccess) => {
        if (!debounceValidate) {
          if (onSuccess) onSuccess();
          return;
        }

        form.isValidating = true;
        const { setErrors } = form;

        if (cancellable) cancellable();
        cancellable = makeCancelable(
          debounceValidate(form.values),
          errorInfo => setErrors(errorInfo) && onSuccess && onSuccess(),
          () => {
            set(curState => {
              curState.isValidating = false;
            }, `Validation Threw${typeSuffix}`);
            if (onSuccess) onSuccess();
          }
        );
      },

      hasError: fieldName => getIn(get().errors, fieldName, false),

      hasVisited: fieldName => getIn(get().visited, fieldName, false),

      isTouched: fieldName => getIn(get().touched, fieldName, false),

      setFieldValue: (fieldName, value) =>
        set(form => {
          mutateSet(form.values, fieldName, value);
          const pristine = calcPristine(form);
          if (pristine !== form.isPristine) form.isPristine = pristine;
          form.validate(form);
        }, `Set Field Value${typeSuffix}`),

      setValues: values =>
        set(form => {
          form.values = values;
          const pristine = calcPristine(form);
          if (pristine !== form.isPristine) form.isPristine = pristine;
          form.validate(form);
        }, `Set Values${typeSuffix}`),

      setInitialValues: values =>
        set(form => {
          const vals = isFunction(values)
            ? values({ set, get, id: storeId })
            : values;
          form.values = vals;
          form.isPristine = true;
          form.isValid = true;
          form.errors = {};
          form.visited = {};
          form.touched = {};
          form.origState = undefined;
          form.origState = { ...form };
        }, `Set Initial Values${typeSuffix}`),

      setFieldError: (fieldName, error) =>
        set(form => {
          mutateSet(form.errors, fieldName, error);
        }, `Set Field Error${typeSuffix}`),

      setErrors: ({ errors, isValid, merge = true }) =>
        set(form => {
          if (merge) mutateMerge(form.errors, errors);
          else form.errors = errors;

          if (form.isValid !== isValid) form.isValid = isValid;

          if (form.isValidating) form.isValidating = false;
        }, `Set Errors${typeSuffix}`),

      setFieldVisited: (fieldName, visited) =>
        set(form => {
          mutateSet(form.visited, fieldName, visited);
        }, `Set Field Visited${typeSuffix}`),

      setFieldTouched: (fieldName, touched) =>
        set(form => {
          mutateSet(form.touched, fieldName, touched);
        }, `Set Field Touched${typeSuffix}`),

      setTouched: (touched, merge = true) =>
        set(form => {
          if (merge) mutateMerge(form.touched, touched);
          else form.touched = touched;
        }, `Set Touched${typeSuffix}`),

      reset: e => {
        if (e) e.preventDefault();
        const s = set(form => {
          const { origState } = form;
          const newFormState = {
            ...form,
            ...origState,
            origState
          };

          const props = Object.getOwnPropertyNames(form);
          for (let i = 0, len = props.length; i < len; i++)
            delete form[props[i]];
          Object.assign(form, newFormState);
        }, `Reset Form${typeSuffix}`);
        if (onReset === undefined) {
          const formStateOnReset = get().onReset;
          if (formStateOnReset) onReset = () => formStateOnReset;
        }
        const realOnReset = onReset && onReset({ set, get, id: storeId });
        if (realOnReset) realOnReset(get().values);
        return s;
      },

      submit: e => {
        if (e) e.preventDefault();
        if (get(form => form.isValidating || form.isSubmitting)) return;

        const finishSubmit = () => {
          if (onSubmit === undefined) {
            const formStateOnSubmit = get().onSubmit;
            if (formStateOnSubmit) onSubmit = () => formStateOnSubmit;
          }
          const realOnSubmit = onSubmit && onSubmit({ set, get, id: storeId });

          Promise.resolve(realOnSubmit && realOnSubmit(get().values))
            .then(rslt => {
              set(form => {
                form.isSubmitting = false;
                form.submitCount += 1;
                if (rslt) {
                  if (!form.isPristine) form.isPristine = true;
                  if (keys(form.errors).length > 0) form.errors = {};
                  if (keys(form.visited).length > 0) form.visited = {};
                  if (keys(form.touched).length > 0) form.touched = {};
                  form.origState = undefined;
                  form.origState = { ...form };
                }
              }, `End Submit${typeSuffix}`);
            })
            .catch(() =>
              set(form => {
                if (form.isSubmitting) form.isSubmitting = false;
              })
            );
        };

        set(form => {
          form.isSubmitting = true;
          form.validate(form, finishSubmit);
        }, `Begin Submit${typeSuffix}`);
      }
    };

    stage1.origState = { ...stage1 };
    return stage1;
  }
});
