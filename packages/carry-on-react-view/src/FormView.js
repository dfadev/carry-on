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

const FormView = withState(components)(
  withNodesToProps(
    ({
      from,
      store = from,
      id = "form",
      FormViewBox: RootFormViewBox,
      SectionBox: RootSectionBox,
      register = [],
      children,
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
      >
        <FormState form={id}>
          {({
            section,
            sections = [],
            components: {
              FormViewBox = RootFormViewBox,
              SectionBox = RootSectionBox
            } = {}
          }) =>
            sections ? (
              <FormViewBox form={id}>
                {sections.map((sectionEntry, j) => (
                  <SectionBox
                    key={j /* eslint-disable-line react/no-array-index-key */}
                    {...deproxify(section)}
                    {...deproxify(sectionEntry)}
                    form={id}
                  >
                    <SectionView {...deproxify(sectionEntry)} form={id} />
                  </SectionBox>
                ))}
              </FormViewBox>
            ) : null
          }
        </FormState>
        {children}
      </Form>
    )
  )
);

export default FormView;

export const InitialValues = () => null;
InitialValues.prop = "initialValues";
export const Sections = () => null;
Sections.prop = "sections";
Sections.transform = v => {
  const nodes = Array.isArray(v) ? v : [v];
  const sections = [];
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    const node = nodes[i];
    const { children, ...props } = node.props;
    const section = {
      layout: children,
      ...props
    };
    sections.push(section);
  }

  return sections;
};
export const Section = () => null;
export const Fields = () => null;
Fields.prop = "fields";
Fields.transform = v => {
  const nodes = Array.isArray(v) ? v : [v];
  const fields = {};
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    const node = nodes[i];
    const { children, name, ...props } = node.props;
    const field = {
      ...children,
      ...props
    };
    fields[name] = field;
  }

  return fields;
};
export const Field = () => null;
