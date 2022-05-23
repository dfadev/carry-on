import React from "react";
import { Form } from "carry-on-react-forms";
import { withNodesToProps } from "carry-on-react";
import { forceArray } from "carry-on-utils";
import FormViewer from "./FormViewer";

function FormView({
  from,
  store = from,
  id = "form",
  register = [],
  children = null,
  onMount,
  onUnmount,
  onValidate,
  onSubmit,
  onReset,
  noFormTag,
  sections,
  fields,
  ...rest
}) {
  return (
    <Form
      id={id}
      register={[
        ...forceArray(register),
        {
          state: () => ({
            fields,
            sections,
            ...rest
          })
        }
      ]}
      store={store}
      onMount={onMount}
      onUnmount={onUnmount}
      onValidate={onValidate}
      onSubmit={onSubmit}
      onReset={onReset}
      noFormTag={noFormTag}
    >
      <FormViewer fields={fields} sections={sections} />
      {children}
    </Form>
  );
}

FormView.composes = [
  "initialValues",
  "register",
  "sections",
  "fields",
  "section",
  "view",
  "children"
];

export default withNodesToProps(FormView);
