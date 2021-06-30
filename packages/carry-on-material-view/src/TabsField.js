import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { withNodesToProp } from "carry-on-react";
import { Field } from "carry-on-react-forms";
import { getIn } from "carry-on-utils";
import eventHandler from "./eventHandler";

const TabsField = withNodesToProp("tabs")(
  withStyles(
    {},
    { name: "CoTabsField" }
  )(({ name, tabs, tabsProps, onTabChange }) => (
    <Field path={name}>
      {(field, store) => {
        if (!tabs) return null;
        if (typeof tabs === "string") tabs = getIn(field.form.values, tabs);

        const {
          element: { id }
        } = field;

        const handleChange = (e, val) => {
          field.setValue(val);
          eventHandler(onTabChange, id, val, store)(e);
        };

        let headerIndex = 0;
        const headers =
          tabs &&
          tabs.map((item, idx) => {
            const fieldLabel =
              typeof item.label === "function"
                ? item.label(field, store)
                : item.label;
            headerIndex += 1;

            return (
              <Tab
                key={`tab-field-header-${headerIndex}`}
                value={
                  item.value === undefined || item.value === null
                    ? idx
                    : item.value
                }
                label={fieldLabel}
              />
            );
          });

        let tabValue;
        if (
          field.element.value === undefined ||
          field.element.value === null ||
          field.element.value === ""
        ) {
          if (tabs.length === 0) tabValue = 0;
          else if (tabs[0].value === undefined || tabs[0].value === null)
            tabValue = 0;
          else tabValue = tabs[0].value;
        } else tabValue = field.element.value;

        const valToIdx = {};
        if (tabs)
          tabs.forEach((item, idx) => {
            valToIdx[
              item.value === undefined || item.value === null ? idx : item.value
            ] = idx;
          });

        let pageIndex = 0;
        const pages =
          tabs &&
          tabs.map((item, idx) => {
            pageIndex += 1;
            return (
              <Box
                hidden={
                  (item.value !== undefined && item.value !== tabValue) ||
                  (item.value === undefined && idx !== tabValue)
                }
                key={`tab-field-page-${pageIndex}`}
              >
                {item.content}
              </Box>
            );
          });

        return (
          <>
            <Tabs {...tabsProps} value={tabValue} onChange={handleChange}>
              {headers}
            </Tabs>
            {pages}
          </>
        );
      }}
    </Field>
  ))
);

export default TabsField;
