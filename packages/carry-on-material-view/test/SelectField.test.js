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
import SelectField from "../src/SelectField";

beforeEach(() => {
  initStores();
});

it("should render <SelectField> inside a Form", () => {
  expect(
    render(
      <Store id={"selectFieldForm"}>
        <Form>
          <Paper>
            <Box px={3} pt={2} pb={3} mb={2}>
              <SelectField
                name="abc"
                label="Example Editor"
                fullWidth
                options={[
                  {
                    value: "red",
                    label: <span style={{ color: "red" }}>Red</span>
                  },
                  {
                    value: "green",
                    label: <span style={{ color: "green" }}>Green</span>
                  },
                  {
                    value: "blue",
                    label: <span style={{ color: "blue" }}>Blue</span>
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

it("should render <SelectField> inside a FormView", () => {
  expect(
    render(
      <Store id={"selectFieldFormView"}>
        <FormView>
          <Register>{materialViewComponents}</Register>
          <Fields>
            <Field
              name="abc"
              label="Example Editor"
              editor="select"
              fullWidth
              view={{ xs: 12 }}
              options={[
                {
                  value: "red",
                  label: <span style={{ color: "red" }}>Red</span>
                },
                {
                  value: "green",
                  label: <span style={{ color: "green" }}>Green</span>
                },
                {
                  value: "blue",
                  label: <span style={{ color: "blue" }}>Blue</span>
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
