/**
 * @jest-environment jsdom
 */
import React from "react";
import { initStores } from "carry-on-store";
import { render } from "@testing-library/react";
import { Paper, Box } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
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
import SubmitIconField from "../src/SubmitIconField";

beforeEach(() => {
  initStores();
});

it("should render <SubmitIconField> inside a Form", () => {
  expect(
    render(
      <Store id={"submitIconFieldForm"}>
        <Form>
          <Paper>
            <Box px={3} pt={2} pb={3} mb={2}>
              <SubmitIconField name="abc" label={<PublishIcon />} />
            </Box>
          </Paper>
        </Form>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});

it("should render <SubmitIconField> inside a FormView", () => {
  expect(
    render(
      <Store id={"submitIconFieldFormView"}>
        <FormView>
          <Register>{materialViewComponents}</Register>
          <Fields>
            <Field name="abc" label={<PublishIcon />} editor="submitIcon" />
          </Fields>
          <Sections>
            <Section>{["abc"]}</Section>
          </Sections>
        </FormView>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});
