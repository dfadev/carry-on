import React from "react";
import { FormState } from "carry-on-react-forms";
import GenericInputField from "./GenericInputField";

function SectionView({
  view,
  layout,
  View: RootView,
  ViewItem: RootViewItem,
  editors: rootEditors,
  fields: fieldsProp
}) {
  return (
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

        // console.log("ViewItem", ViewItem);
        // console.log("View", View);
        // console.log("editors", editors);
        let processLayout;
        let viewKey = 0;

        const processLayouts = list =>
          list
            ? typeof list === "string" || list instanceof String
              ? processLayout(list)
              : list.map(processLayout)
            : null;

        /* eslint-disable-next-line react/no-unstable-nested-components */
        processLayout = name => {
          if (Array.isArray(name)) {
            viewKey += 1;
            return (
              <View {...section} {...view} key={viewKey}>
                {processLayouts(name)}
              </View>
            );
          }

          if (typeof name !== "string" && !(name instanceof String))
            return null;
          const field = (fieldsStore && fieldsStore[name]) ||
            (fieldsProp && fieldsProp[name]) || { label: name };
          const {
            editor,
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
          let editorKey = editor;
          if (
            editorKey === undefined &&
            fieldEditorProps &&
            fieldEditorProps.content
          )
            editorKey = "content";

          if (editorKey === undefined) editorKey = "text";

          if (editorKey !== undefined && typeof editorKey !== "string")
            Editor = editorKey;
          else Editor = (editors && editors[editorKey]) || GenericInputField;

          // console.log(name || fieldName, editorKey, Editor);
          return (
            <ViewItem {...fieldView} key={key} field={field}>
              <Editor {...fieldEditorProps} name={name || fieldName} />
            </ViewItem>
          );
        };

        if (layout && !Array.isArray(layout[0])) layout = [layout];

        const screen = processLayouts(layout);
        // console.log("SectionView screen", screen);
        return screen;
      }}
    </FormState>
  );
}

export default SectionView;
