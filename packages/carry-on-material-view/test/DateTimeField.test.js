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
import DateTimeField from "../src/DateTimeField";

beforeEach(() => {
  initStores();
});

it("should render <DateTimeField> inside a Form", () => {
  expect(
    render(
      <Store id={"dateTimeFieldForm"}>
        <Form>
          <Paper>
            <Box px={3} pt={2} pb={3} mb={2}>
              <DateTimeField
                name="abc"
                label="Example Editor"
                keyboard={false}
                format="MM/dd/yyyy hh:mm a"
              />
            </Box>
          </Paper>
        </Form>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});

it("should render <DateTimeField> inside a FormView", () => {
  expect(
    render(
      <Store id={"dateTimeFieldFormView"}>
        <FormView>
          <Register>{materialViewComponents}</Register>
          <Fields>
            <Field
              name="abc"
              label="Example Editor"
              editor="dateTime"
              keyboard={false}
              format="MM/dd/yyyy hh:mm a"
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
