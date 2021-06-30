/**
 * @jest-environment jsdom
 */
import React from "react";
import { initStores } from "carry-on-store";
import { render } from "@testing-library/react";
import { Paper, Box } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
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
import SubmitFabField from "../src/SubmitFabField";

beforeEach(() => {
  initStores();
});

it("should render <SubmitFabField> inside a Form", () => {
  expect(
    render(
      <Store id={"submitFabFieldForm"}>
        <Form>
          <Paper>
            <Box px={3} pt={2} pb={3} mb={2}>
              <SubmitFabField name="abc" label={<PublishIcon />} />
            </Box>
          </Paper>
        </Form>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});

it("should render <SubmitFabField> inside a FormView", () => {
  expect(
    render(
      <Store id={"submitFabFieldFormView"}>
        <FormView>
          <Register>{materialViewComponents}</Register>
          <Fields>
            <Field name="abc" label={<PublishIcon />} editor="submitFab" />
          </Fields>
          <Sections>
            <Section>{["abc"]}</Section>
          </Sections>
        </FormView>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});
