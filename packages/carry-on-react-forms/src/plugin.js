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
  toPath,
  keys
} from "carry-on-utils";

export default ({
  id = "form",
  initialValues,
  onValidate,
  onSubmit,
  onReset
}) => ({
  state: ({ set, get }) => {
    const idPath = toPath(id);

    let cancellable;

    if (onValidate === undefined) {
      const formStateOnValidate = get(q => getInA(q, idPath).onValidate);
      if (formStateOnValidate !== undefined)
        onValidate = () => formStateOnValidate;
    }

    const debounceValidate = onValidate
      ? debouncePromise(onValidate({ set, get }), 200)
      : undefined;

    const typeSuffix = " (" + id + ")";

    const calcPristine = form => isEqual(form.origState.values, form.values);

    if (initialValues === undefined)
      initialValues = get(q => getInA(q, idPath).initialValues || {});

    const stage1 = {
      visited: {},
      touched: {},
      errors: {},
      isPristine: true,
      isSubmitting: false,
      isValidating: false,
      isValid: true,
      validation: undefined,
      values: isFunction(initialValues)
        ? initialValues({ set, get })
        : initialValues,

      validate: (state, onSuccess) => {
        if (!debounceValidate) return;

        const form = getInA(state, idPath);
        form.isValidating = true;
        const setErrors = form.setErrors;

        cancellable && cancellable();
        cancellable = makeCancelable(
          debounceValidate(form.values),
          errorInfo => setErrors(errorInfo) && onSuccess && onSuccess(),
          () => {
            set(
              curState => (getInA(curState, idPath).isValidating = false),
              "Validation Threw" + typeSuffix
            );
            onSuccess && onSuccess();
          }
        );
      },

      hasError: fieldName =>
        get(state => getIn(getInA(state, idPath).errors, fieldName, false)),

      hasVisited: fieldName =>
        get(state => getIn(getInA(state, idPath).visited, fieldName, false)),

      isTouched: fieldName =>
        get(state => getIn(getInA(state, idPath).touched, fieldName, false)),

      setFieldValue: (fieldName, value) =>
        set(state => {
          const form = getInA(state, idPath);
          mutateSet(form.values, fieldName, value);
          const pristine = calcPristine(form);
          if (pristine !== form.isPristine) form.isPristine = pristine;
          form.validate(state);
        }, "Set Field Value" + typeSuffix),

      setValues: values =>
        set(state => {
          const form = getInA(state, idPath);
          if (form.values !== values) form.values = values;
          const pristine = calcPristine(form);
          if (pristine !== form.isPristine) form.isPristine = pristine;
          form.validate(state);
        }, "Set Values" + typeSuffix),

      setFieldError: (fieldName, error) =>
        set(state => {
          mutateSet(getInA(state, idPath).errors, fieldName, error);
        }, "Set Field Error" + typeSuffix),

      setErrors: ({ errors, isValid, merge = true }) =>
        set(state => {
          const form = getInA(state, idPath);

          if (merge) mutateMerge(form.errors, errors);
          else form.errors = errors;

          if (form.isValid !== isValid) form.isValid = isValid;

          if (form.isValidating) form.isValidating = false;
        }, "Set Errors" + typeSuffix),

      setFieldVisited: (fieldName, visited) =>
        set(state => {
          mutateSet(getInA(state, idPath).visited, fieldName, visited);
        }, "Set Field Visited" + typeSuffix),

      setFieldTouched: (fieldName, touched) =>
        set(state => {
          mutateSet(getInA(state, idPath).touched, fieldName, touched);
        }, "Set Field Touched" + typeSuffix),

      setTouched: (touched, merge = true) =>
        set(state => {
          const form = getInA(state, idPath);
          if (merge) mutateMerge(form.touched, touched);
          else form.touched = touched;
        }, "Set Touched" + typeSuffix),

      reset: e => {
        e && e.preventDefault();
        const s = set(state => {
          const formState = getInA(state, idPath);
          const origState = formState.origState;
          const newFormState = {
            ...formState,
            ...origState,
            origState
          };
          mutateSet(state, id, newFormState);
        }, "Reset Form" + typeSuffix);
        if (onReset === undefined) {
          const formStateOnReset = get(q => getInA(q, idPath).onReset);
          if (formStateOnReset) onReset = () => formStateOnReset;
        }
        const realOnReset = onReset && onReset({ set, get });
        realOnReset && realOnReset(get(q => getInA(q, idPath).values));
        return s;
      },

      submit: e => {
        e && e.preventDefault();
        if (
          get(state => {
            const form = getInA(state, idPath);
            return form.isValidating || form.isSubmitting;
          })
        )
          return;

        const finishSubmit = () => {
          if (onSubmit === undefined) {
            const formStateOnSubmit = get(q => getInA(q, idPath).onSubmit);
            if (formStateOnSubmit) onSubmit = () => formStateOnSubmit;
          }
          const realOnSubmit = onSubmit && onSubmit({ set, get });

          Promise.resolve(
            realOnSubmit && realOnSubmit(get(q => getInA(q, idPath).values))
          )
            .then(rslt => {
              set(curState => {
                const form = getInA(curState, idPath);
                form.isSubmitting = false;
                if (rslt) {
                  if (!form.isPristine) form.isPristine = true;
                  if (keys(form.errors).length > 0) form.errors = {};
                  if (keys(form.visited).length > 0) form.visited = {};
                  if (keys(form.touched).length > 0) form.touched = {};
                  form.origState = undefined;
                  form.origState = { ...form };
                }
              }, "End Submit" + typeSuffix);
            })
            .catch(() =>
              set(curState => {
                const form = getInA(curState, idPath);
                if (form.isSubmitting) form.isSubmitting = false;
                return curState;
              })
            );
        };

        const beginSubmitState = set(state => {
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
