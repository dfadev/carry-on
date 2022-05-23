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
import ToggleButtonGroupField from "../src/ToggleButtonGroupField";

beforeEach(() => {
  initStores();
});

it("should render <ToggleButtonGroupField> inside a Form", () => {
  expect(
    render(
      <Store id="toggleButtonGroupForm">
        <Register>
          {{
            thing: 1
          }}
        </Register>
        <Form>
          <Register>
            {{
              onChange: (e, store) => {
                console.log(e, store);
              }
            }}
          </Register>
          <Paper>
            <Box px={3} pt={2} pb={3} mb={2}>
              <ToggleButtonGroupField
                name="abc"
                label="Example Editor"
                onChange="onChange"
                buttons={[
                  { value: 1, content: "Toggle 1" },
                  { value: 2, content: "Toggle 2" },
                  { value: 3, content: "Toggle 3" }
                ]}
              />
            </Box>
          </Paper>
        </Form>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});

it("should render <ToggleButtonGroupField> inside a FormView", () => {
  expect(
    render(
      <Store id="toggleButtonGroupFormView">
        <FormView>
          <Register>{materialViewComponents}</Register>
          <Fields>
            <Field
              name="abc"
              label="Example Editor"
              editor="toggleButtonGroup"
              buttons={[
                { value: 1, content: "Toggle 1" },
                { value: 2, content: "Toggle 2" },
                { value: 3, content: "Toggle 3" }
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
