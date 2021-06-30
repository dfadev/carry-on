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
  Section,
  InitialValues
} from "carry-on-react-view";
import { materialViewComponents } from "../src/registerComponents";
import PhoneField from "../src/PhoneField";

beforeEach(() => {
  initStores();
});

it("should render <PhoneField> inside a Form", () => {
  expect(
    render(
      <Store id={"phoneFieldForm"}>
        <Form>
          <InitialValues>
            {{
              phone1: "7025551212",
              phone2: "447911123456"
            }}
          </InitialValues>
          <Paper>
            <Box px={3} pt={2} pb={3} mb={2}>
              <PhoneField name="phone1" label="US Phone" />
              <PhoneField name="phone2" label="GB Phone" defaultCountry="GB" />
            </Box>
          </Paper>
        </Form>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});

it("should render <PhoneField> inside a FormView", () => {
  expect(
    render(
      <Store id={"phoneFieldFormView"}>
        <FormView>
          <Register>{materialViewComponents}</Register>
          <Fields>
            <Field name="phone1">
              {{
                label: "US Phone",
                editor: "phone"
              }}
            </Field>
            <Field name="phone2">
              {{
                label: "UK Phone",
                editor: "phone",
                defaultCountry: "GB"
              }}
            </Field>
          </Fields>
          <Sections>
            <Section>{["phone1", "phone2"]}</Section>
          </Sections>
        </FormView>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});
