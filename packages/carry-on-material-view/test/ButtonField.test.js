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
import ButtonField from "../src/ButtonField";

beforeEach(() => {
  initStores();
});

it("should render <ButtonField> inside a Form", () => {
  let clickCount = 0;
  expect(
    render(
      <Store id={"buttonFieldForm"}>
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
              <ButtonField
                name="abc"
                label="Example Button"
                onClick="clickHandler"
              />
            </Box>
          </Paper>
        </Form>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});

it("should render <ButtonField> inside a FormView", () => {
  expect(
    render(
      <Store id={"buttonFieldFormView"}>
        <FormView>
          <Register>{materialViewComponents}</Register>
          <Register>
            {() => ({
              clickHandler: (e, store) => {
                clickCount += 1;
              }
            })}
          </Register>
          <Fields>
            <Field
              name="abc"
              label="Example Button"
              editor="button"
              onClick="clickHandler"
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
