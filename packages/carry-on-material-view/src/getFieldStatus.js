import { deproxify } from "carry-on-utils";

export default function getFieldStatus(field, store, value, disabled) {
  const { error, form = {} } = field;
  const touched = form.submitCount > 0 || field.touched;
  const hasError = Boolean(touched && error);

  const dis = Boolean(
    form.isSubmitting ||
      (typeof disabled === "function" ? disabled(field, store) : disabled)
  );

  let fieldValue;
  if (value !== undefined) {
    fieldValue = typeof value === "function" ? value(field, store) : value;
  } else {
    fieldValue =
      field.element.type === "checkbox" || field.element.type === "radio"
        ? field.element.checked
        : field.element.value;
  }

  return {
    touched,
    error,
    hasError,
    disabled: dis,
    value: deproxify(fieldValue)
  };
}
