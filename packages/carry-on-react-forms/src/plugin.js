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

export default ({
  id,
  initialValues,
  onValidate,
  onSubmit,
  onReset
}) => ({
  state: ({ id: storeId, set, get }) => {
    const idPath = toPath(id);
    const curForm = (state = get()) => getInA(state, idPath, {});

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

      validate: (state, onSuccess) => {
        if (!debounceValidate) {
          if (onSuccess) onSuccess();
          return;
        }

        const form = curForm(state);
        form.isValidating = true;
        const { setErrors } = form;

        if (cancellable) cancellable();
        cancellable = makeCancelable(
          debounceValidate(form.values),
          errorInfo => setErrors(errorInfo) && onSuccess && onSuccess(),
          () => {
            set(curState => {
              curForm(curState).isValidating = false;
            }, `Validation Threw${typeSuffix}`);
            if (onSuccess) onSuccess();
          }
        );
      },

      hasError: fieldName => getIn(curForm().errors, fieldName, false),

      hasVisited: fieldName => getIn(curForm().visited, fieldName, false),

      isTouched: fieldName => getIn(curForm().touched, fieldName, false),

      setFieldValue: (fieldName, value) =>
        set(state => {
          const form = curForm(state);
          mutateSet(form.values, fieldName, value);
          const pristine = calcPristine(form);
          if (pristine !== form.isPristine) form.isPristine = pristine;
          form.validate(state);
        }, `Set Field Value${typeSuffix}`),

      setValues: values =>
        set(state => {
          const form = curForm(state);
          if (form.values !== values) form.values = values;
          const pristine = calcPristine(form);
          if (pristine !== form.isPristine) form.isPristine = pristine;
          form.validate(state);
        }, `Set Values${typeSuffix}`),

      setInitialValues: values =>
        set(state => {
          const form = curForm(state);
          const vals = isFunction(values)
            ? values({ set, get, id: storeId })
            : values;
          form.initialValues = vals;
          form.values = vals;
          form.isPristine = true;
          form.isValid = true;
        }, `Set Initial Values${typeSuffix}`),

      setFieldError: (fieldName, error) =>
        set(state => {
          mutateSet(curForm(state).errors, fieldName, error);
        }, `Set Field Error${typeSuffix}`),

      setErrors: ({ errors, isValid, merge = true }) =>
        set(state => {
          const form = curForm(state);

          if (merge) mutateMerge(form.errors, errors);
          else form.errors = errors;

          if (form.isValid !== isValid) form.isValid = isValid;

          if (form.isValidating) form.isValidating = false;
        }, `Set Errors${typeSuffix}`),

      setFieldVisited: (fieldName, visited) =>
        set(state => {
          mutateSet(curForm(state).visited, fieldName, visited);
        }, `Set Field Visited${typeSuffix}`),

      setFieldTouched: (fieldName, touched) =>
        set(state => {
          mutateSet(curForm(state).touched, fieldName, touched);
        }, `Set Field Touched${typeSuffix}`),

      setTouched: (touched, merge = true) =>
        set(state => {
          const form = curForm(state);
          if (merge) mutateMerge(form.touched, touched);
          else form.touched = touched;
        }, `Set Touched${typeSuffix}`),

      reset: e => {
        if (e) e.preventDefault();
        const s = set(state => {
          const formState = curForm(state);
          const { origState } = formState;
          const newFormState = {
            ...formState,
            ...origState,
            origState
          };
          mutateSet(state, id, newFormState);
        }, `Reset Form${typeSuffix}`);
        if (onReset === undefined) {
          const formStateOnReset = curForm().onReset;
          if (formStateOnReset) onReset = () => formStateOnReset;
        }
        const realOnReset = onReset && onReset({ set, get, id: storeId });
        if (realOnReset) realOnReset(curForm().values);
        return s;
      },

      submit: e => {
        if (e) e.preventDefault();
        if (
          get(state => {
            const form = curForm(state);
            return form.isValidating || form.isSubmitting;
          })
        )
          return;

        const finishSubmit = () => {
          if (onSubmit === undefined) {
            const formStateOnSubmit = curForm().onSubmit;
            if (formStateOnSubmit) onSubmit = () => formStateOnSubmit;
          }
          const realOnSubmit = onSubmit && onSubmit({ set, get, id: storeId });

          Promise.resolve(realOnSubmit && realOnSubmit(curForm().values))
            .then(rslt => {
              set(curState => {
                const form = curForm(curState);
                form.isSubmitting = false;
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
              set(curState => {
                const form = curForm(curState);
                if (form.isSubmitting) form.isSubmitting = false;
              })
            );
        };

        const beginSubmitState = set(state => {
          const form = curForm(state);
          form.isSubmitting = true;
          form.validate(state, finishSubmit);
        }, `Begin Submit${typeSuffix}`);

        if (!curForm(beginSubmitState).isValidating) finishSubmit();
      }
    };

    const stage2 = mutateSet({}, id, stage1);
    const form = getInA(stage2, idPath);
    form.origState = { ...stage1 };
    return stage2;
  }
});
