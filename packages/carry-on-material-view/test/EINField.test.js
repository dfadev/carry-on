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
import EINField from "../src/EINField";

beforeEach(() => {
  initStores();
});

it("should render <EINField> inside a Form", () => {
  expect(
    render(
      <Store id={"einFieldForm"}>
        <Form>
          <Paper>
            <Box px={3} pt={2} pb={3} mb={2}>
              <EINField name="abc" label="Example Editor" />
            </Box>
          </Paper>
        </Form>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});

it("should render <EINField> inside a FormView", () => {
  expect(
    render(
      <Store id={"einFieldFormView"}>
        <FormView>
          <Register>{materialViewComponents}</Register>
          <Fields>
            <Field name="abc" label="Example Editor" editor="ein" />
          </Fields>
          <Sections>
            <Section>{["abc"]}</Section>
          </Sections>
        </FormView>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});
