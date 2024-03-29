/**
 * @jest-environment jsdom
 */
import React from "react";
import { initStores } from "carry-on-store";
import { render } from "@testing-library/react";
import { Paper, Box } from "@mui/material";
import { Store, Register } from "carry-on-react";
import { Form } from "carry-on-react-forms";
import {
  FormView,
  Fields,
  Field,
  Sections,
  Section
} from "carry-on-react-view";
import { materialViewComponents } from "../src/registerComponents";
import TabsField from "../src/TabsField";

beforeEach(() => {
  initStores();
});

it("should render <TabsField> inside a Form", () => {
  expect(
    render(
      <Store id={"tabsFieldForm"}>
        <Form>
          <Register>
            {() => ({
              onTabChange: (e, store) => {
                console.log(e, store);
              }
            })}
          </Register>
          <Paper>
            <Box px={3} pt={2} pb={3} mb={2}>
              <TabsField name="abc" onTabChange="onTabChange">
                {[
                  {
                    label: <Box style={{ color: "red" }}>Red</Box>,
                    content: <Box pt={1}>Red Content</Box>,
                    value: "red"
                  },
                  {
                    label: <Box style={{ color: "green" }}>Green</Box>,
                    content: <Box pt={1}>Green Content</Box>,
                    value: "green"
                  },
                  {
                    label: <Box style={{ color: "blue" }}>Blue</Box>,
                    content: <Box pt={1}>Blue Content</Box>,
                    value: "blue"
                  }
                ]}
              </TabsField>
            </Box>
          </Paper>
        </Form>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});

it("should render <TabsField> inside a FormView", () => {
  expect(
    render(
      <Store id={"tabsFieldFormView"}>
        <FormView>
          <Register>{materialViewComponents}</Register>
          <Register>
            {() => ({
              onTabChange: (e, store) => {
                console.log(e, store);
              }
            })}
          </Register>
          <Fields>
            <Field
              name="abc"
              editor="tabs"
              onTabChange="onTabChange"
              tabs={[
                {
                  label: <Box style={{ color: "red" }}>Red</Box>,
                  content: <Box pt={1}>Red Content</Box>,
                  value: "red"
                },
                {
                  label: <Box style={{ color: "green" }}>Green</Box>,
                  content: <Box pt={1}>Green Content</Box>,
                  value: "green"
                },
                {
                  label: <Box style={{ color: "blue" }}>Blue</Box>,
                  content: <Box pt={1}>Blue Content</Box>,
                  value: "blue"
                }
              ]}
            />
          </Fields>
          <Sections>
            <Section>{["abc"]}</Section>
          </Sections>
        </FormView>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});
