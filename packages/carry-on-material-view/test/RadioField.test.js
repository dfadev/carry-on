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
import RadioField from "../src/RadioField";

beforeEach(() => {
  initStores();
});

it("should render <RadioField> inside a Form", () => {
  expect(
    render(
      <Store id={"radioFieldForm"}>
        <Form>
          <Paper>
            <Box px={3} pt={2} pb={3} mb={2}>
              <RadioField
                name="abc"
                label="Example Editor"
                fullWidth
                options={[
                  {
                    value: "red",
                    label: <Box style={{ color: "red" }}>Red</Box>
                  },
                  {
                    value: "green",
                    label: <Box style={{ color: "green" }}>Green</Box>
                  },
                  {
                    value: "blue",
                    label: <Box style={{ color: "blue" }}>Blue</Box>
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

it("should render <RadioField> inside a FormView", () => {
  expect(
    render(
      <Store id={"radioFieldFormView"}>
        <FormView id="myForm">
          <Register>{materialViewComponents}</Register>
          <Fields>
            <Field
              name="abc"
              label="Example Editor"
              editor="radio"
              fullWidth
              view={{ xs: 12 }}
              options={[
                {
                  value: "red",
                  label: <Box style={{ color: "red" }}>Red</Box>
                },
                {
                  value: "green",
                  label: <Box style={{ color: "green" }}>Green</Box>
                },
                {
                  value: "blue",
                  label: <Box style={{ color: "blue" }}>Blue</Box>
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
