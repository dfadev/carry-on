/**
 * @jest-environment jsdom
 */
import React from "react";
import { initStores } from "carry-on-store";
import { render } from "@testing-library/react";
import { Paper, Box } from "@material-ui/core";
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
import ButtonGroupField from "../src/ButtonGroupField";

beforeEach(() => {
  initStores();
});

it("should render <ButtonGroupField> inside a Form", () => {
  let clickCount = 0;
  expect(
    render(
      <Store id="buttonGroupForm">
        <Form>
          <Register>
            {() => ({
              clickHandler: (e, store) => {
                clickCount += 1;
              }
            })}
          </Register>
          <Paper>
            <Box px={3} pt={2} pb={3} mb={2}>
              <ButtonGroupField
                name="abc"
                buttons={[
                  {
                    value: 1,
                    content: <Box style={{ color: "red" }}>Red</Box>,
                    onClick: "clickHandler"
                  },
                  {
                    value: 2,
                    content: <Box style={{ color: "green" }}>Green</Box>,
                    onClick: "clickHandler"
                  },
                  {
                    value: 3,
                    content: <Box style={{ color: "blue" }}>Blue</Box>,
                    onClick: "clickHandler"
                  }
                ]}
              />
            </Box>
          </Paper>
        </Form>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});

it("should render <ButtonGroupField> inside a FormView", () => {
  let clickCount = 0;
  expect(
    render(
      <Store id="buttonGroupFormView">
        <FormView>
          <Register>{materialViewComponents}</Register>
          <Fields>
            <Field
              name="abc"
              editor="buttonGroup"
              buttons={[
                { value: 1, content: <Box style={{ color: "red" }}>Red</Box> },
                {
                  value: 2,
                  content: <Box style={{ color: "green" }}>Green</Box>
                },
                { value: 3, content: <Box style={{ color: "blue" }}>Blue</Box> }
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
