/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Form, FormState } from "carry-on-react-forms";
import { withState, withNodesToProps } from "carry-on-react";
import { deproxify } from "carry-on-utils";
import SectionView from "./SectionView";

const components = {
  select: ({
    components: { FormViewBox = "div", SectionBox = "div" } = {}
  }) => ({
    FormViewBox,
    SectionBox
  })
};

const FormView = ({
  from,
  store = from,
  id = "form",
  FormViewBox: RootFormViewBox,
  SectionBox: RootSectionBox,
  register = [],
  children,
  onMount,
  onUnmount,
  onValidate,
  onSubmit,
  onReset,
  ...rest
}) => (
  <Form
    id={id}
    register={[
      ...register,
      {
        state: {
          [id]: { ...rest }
        }
      }
    ]}
    store={store}
    onMount={onMount}
    onUnmount={onUnmount}
    onValidate={onValidate}
    onSubmit={onSubmit}
    onReset={onReset}
  >
    <FormState form={id}>
      {({
        view,
        section,
        sections = [],
        components: {
          FormViewBox = RootFormViewBox,
          SectionBox = RootSectionBox
        } = {}
      }) =>
        sections && sections.length > 0 ? (
          <FormViewBox {...view}>
            {sections.map((sectionEntry, j) => (
              <SectionBox
                key={j /* eslint-disable-line react/no-array-index-key */}
                {...deproxify(section)}
                {...deproxify(sectionEntry)}
              >
                <SectionView {...deproxify(sectionEntry)} />
              </SectionBox>
            ))}
          </FormViewBox>
        ) : null
      }
    </FormState>
    {children}
  </Form>
);

FormView.composes = ["initialValues", "sections", "fields", "view", "children"];

export default withState(components)(withNodesToProps(FormView));
