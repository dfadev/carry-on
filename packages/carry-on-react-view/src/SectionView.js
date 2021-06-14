/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { withState } from "carry-on-react";
import { FormState } from "carry-on-react-forms";
import GenericInputField from "./GenericInputField";

const components = {
  select: ({
    components: { View = "div", ViewItem = "div", editors = {} } = {}
  }) => ({
    View,
    ViewItem,
    editors
  })
};

const SectionView = withState(components)(
  ({
    prefix,
    layout,
    View: RootView,
    ViewItem: RootViewItem,
    editors: rootEditors
  }) => (
    <FormState>
      {(form, store) => {
        const {
          formId,
          fields,
          view,
          components: {
            View = RootView,
            ViewItem = RootViewItem,
            editors = rootEditors
          } = {}
        } = form;

        let processLayout;
        let viewKey = 0;

        const processLayouts = list =>
          list
            ? typeof list === "string" || list instanceof String
              ? processLayout(list)
              : list.map(processLayout)
            : null;

        processLayout = name => {
          if (Array.isArray(name)) {
            viewKey += 1;
            return <View {...view} key={viewKey}>{processLayouts(name)}</View>;
          }

          if (typeof name === "string" || name instanceof String) {
            const prefixedName = prefix ? `${prefix}.${name}` : name;

            const field = (fields && fields[name]) || { label: name };
            const {
              editor = "text",
              name: fieldName,
              view: fieldView,
              ...fieldEditorProps
            } = field;
            const key = `${store ? store : "default"}.${formId}.${
              prefixedName || fieldName
            }`;

            let Editor;
            if (editor !== undefined && typeof editor !== "string")
              Editor = editor;
            else Editor = editors[editor] || GenericInputField;

            return (
              <ViewItem {...fieldView} key={key} field={field}>
                <Editor
                  {...fieldEditorProps}
                  store={store}
                  name={prefixedName || fieldName}
                />
              </ViewItem>
            );
          }

          return null;
        };

        if (layout && !Array.isArray(layout[0])) layout = [layout];

        return processLayouts(layout);
      }}
    </FormState>
  )
);

export default SectionView;
