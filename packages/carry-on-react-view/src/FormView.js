import React from "react";
import { Form, FormState } from "carry-on-react-forms";
import { withState, withNodesToProps } from "carry-on-react";
import { forceArray } from "carry-on-utils";
import SectionView from "./SectionView";

const components = {
  select: ({
    components: { FormViewBox = "div", SectionBox = "div" } = {}
  }) => ({
    FormViewBox,
    SectionBox
  })
};

export const FormViewer = withState(components)(
  ({
    FormViewBox: RootFormViewBox,
    SectionBox: RootSectionBox,
    sections: sectionsProp,
    fields: fieldsProp,
    noViewBox
  }) => (
    <FormState>
      {(form, store, prefix) => {
        const {
          view,
          section,
          sections = [],
          components: {
            FormViewBox = RootFormViewBox,
            SectionBox = RootSectionBox
          } = {}
        } = form;

        const ViewBox = noViewBox ? React.Fragment : FormViewBox;

        let s = sectionsProp || sections;
        if (typeof s === "function") s = s(form, store, prefix);
        if (!s || s.length === 0) return null;

        return (
          <ViewBox {...view}>
            {s
              .filter(({ hidden }) => {
                if (!hidden) return true;
                if (typeof hidden === "function") return !hidden(form, store, prefix);
                return !hidden;
              })
              .map((sectionEntry, j) => (
                <SectionBox
                  key={j /* eslint-disable-line react/no-array-index-key */}
                  {...section}
                  section={sectionEntry}
                >
                  <SectionView fields={fieldsProp} {...sectionEntry} />
                </SectionBox>
              ))}
          </ViewBox>
        );
      }}
    </FormState>
  )
);
FormViewer.displayName = "FormViewer";

const FormView = ({
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
}) => (
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
