import React from "react";
import { FormState } from "carry-on-react-forms";
import { withState } from "carry-on-react";
import SectionView from "./SectionView";

function PassThru({ children }) {
  return children;
}
const DefaultFormViewBox = PassThru;
const DefaultSectionBox = PassThru;
function DefaultView({ children }) {
  return <div style={{ display: "flex" }}>{children}</div>;
}
const DefaultViewItem = PassThru;

const storeComponents = {
  select: ({
    components: { FormViewBox, SectionBox, View, ViewItem } = {}
  }) => ({ components: { FormViewBox, SectionBox, View, ViewItem } })
};

function FormViewer({
  components: {
    FormViewBox: StoreFormViewBox,
    SectionBox: StoreSectionBox,
    View: StoreView,
    ViewItem: StoreViewItem
  },
  FormViewBox: RootFormViewBox = StoreFormViewBox || DefaultFormViewBox,
  SectionBox: RootSectionBox = StoreSectionBox || DefaultSectionBox,
  View: RootView = StoreView || DefaultView,
  ViewItem: RootViewItem = StoreViewItem || DefaultViewItem,
  sections: sectionsProp,
  fields: fieldsProp,
  editorPath,
  noViewBox
}) {
  return (
    <FormState>
      {(form, store, prefix) => {
        const {
          view,
          section,
          sections = [],
          components: {
            FormViewBox = RootFormViewBox,
            SectionBox = RootSectionBox,
            View = RootView,
            ViewItem = RootViewItem
          } = {}
        } = form;

        const ViewBox = noViewBox ? ({ children }) => children : FormViewBox;

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
                  <SectionView
                    View={View}
                    ViewItem={ViewItem}
                    editorPath={editorPath}
                    fields={fieldsProp}
                    {...sectionEntry}
                  />
                </SectionBox>
              ))}
          </ViewBox>
        );
      }}
    </FormState>
  );
}

export default withState(storeComponents)(FormViewer);
