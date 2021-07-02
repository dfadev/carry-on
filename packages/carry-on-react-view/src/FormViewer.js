import React from "react";
import { FormState } from "carry-on-react-forms";
import { withState } from "carry-on-react";
import SectionView from "./SectionView";

const components = {
  select: ({
    components: {
      FormViewBox = ({ children }) => children,
      SectionBox = ({ children }) => children
    } = {}
  }) => ({
    FormViewBox,
    SectionBox
  })
};

const FormViewer = ({
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
              if (typeof hidden === "function")
                return !hidden(form, store, prefix);
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
);

export default withState(components)(FormViewer);
