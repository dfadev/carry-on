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
  InitialValues,
  Sections,
  Section
} from "carry-on-react-view";
import { materialViewComponents } from "../src/registerComponents";
import DataField from "../src/DataField";

beforeEach(() => {
  initStores();
});

it("should render <DataField> inside a Form", () => {
  expect(
    render(
      <Store id={"dataFieldForm"}>
        <Form>
          <InitialValues>
            {{ abc: "some example data value" }}
          </InitialValues>
          <Paper>
            <Box px={3} pt={2} pb={3} mb={2}>
              <DataField
                name="abc"
                label="Example Data"
              />
            </Box>
          </Paper>
        </Form>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});

it("should render <DataField> inside a FormView", () => {
  expect(
    render(
      <Store id={"dataFieldFormView"}>
        <FormView>
          <Register>{materialViewComponents}</Register>
          <InitialValues>
            {{ abc: "some example data value" }}
          </InitialValues>
          <Fields>
            <Field
              name="abc"
              label="Example Data"
              editor="data"
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
