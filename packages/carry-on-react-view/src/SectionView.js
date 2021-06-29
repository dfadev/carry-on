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

const SectionView = ({
  view,
  layout,
  View: RootView,
  ViewItem: RootViewItem,
  editors: rootEditors,
  fields: fieldsProp
}) => (
  <FormState>
    {(form, store, prefix) => {
      const {
        formId,
        section,
        fields: fieldsStore,
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
          return (
            <View {...section} {...view} key={viewKey}>
              {processLayouts(name)}
            </View>
          );
        }

        if (typeof name === "string" || name instanceof String) {
          const field = (fieldsStore && fieldsStore[name]) ||
            (fieldsProp && fieldsProp[name]) || { label: name };
          const {
            editor = "text",
            name: fieldName,
            view: fieldView,
            hidden,
            ...fieldEditorProps
          } = field;

          if (hidden !== undefined && hidden !== null && hidden) {
            if (typeof hidden === "function") {
              const hide = hidden(form, store, prefix);
              if (hide) return null;
            } else return null;
          }

          const key = `${store.id || "default"}.${formId}.${name || fieldName}`;

          let Editor;
          if (editor !== undefined && typeof editor !== "string")
            Editor = editor;
          else Editor = editors[editor] || GenericInputField;

          return (
            <ViewItem {...fieldView} key={key} field={field}>
              <Editor {...fieldEditorProps} name={name || fieldName} />
            </ViewItem>
          );
        }

        return null;
      };

      if (layout && !Array.isArray(layout[0])) layout = [layout];

      return processLayouts(layout);
    }}
  </FormState>
);

export default withState(components)(SectionView);
