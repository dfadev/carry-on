import React from "react";
import { getIn } from "carry-on-utils";
import { Field } from "carry-on-react-forms";
import { FormViewer } from "carry-on-react-view";
// import { IconButtonField } from "carry-on-material-view";

function AppBarField({ name, linksPath = "links", editorPath = "nav.top" }) {
  return (
    <Field path={name}>
      {field => {
        const links = getIn(field.form.values, linksPath);
        const sections = field.element.value.map(item => ({ layout: item }));

        return (
          <FormViewer
            sections={sections}
            fields={links}
            editorPath={editorPath}
          />
        );

        /*      {field.element.value.map((link, idx) => {
              const lnk = linkage[link];
              if (!lnk) return null;

              const editorInfo = getIn(lnk, editorPath);
              if (!editorInfo) return null;

              const { editor, ...editorParams } = editorInfo;

              if (editor !== "iconButton") return null;

              return (
                <IconButtonField
                  key={idx}
                  name={`${linksPath}[${link}]`}
                  to={lnk.url}
                  {...editorParams}
                >
                  {lnk.icon || lnk.label}
                </IconButtonField>
              );
            }) } */
      }}
    </Field>
  );
}

export default AppBarField;
