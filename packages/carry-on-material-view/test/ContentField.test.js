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
import ContentField from "../src/ContentField";

beforeEach(() => {
  initStores();
});

it("should render <ContentField> inside a Form", () => {
  expect(
    render(
      <Store id={"contentFieldForm"}>
        <Form>
          <Paper>
            <Box px={3} pt={2} pb={3} mb={2}>
              <ContentField
                name="abc"
                wrapper="div"
                content={
                  <Paper elevation={10}>
                    <Box p={2}>Some JSX content</Box>
                  </Paper>
                }
                editor="content"
              />
            </Box>
          </Paper>
        </Form>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});

it("should render <ContentField> inside a FormView", () => {
  expect(
    render(
      <Store id={"contentFieldFormView"}>
        <FormView>
          <Register>{materialViewComponents}</Register>
          <Fields>
            <Field
              name="abc"
              editor="content"
              view={{ xs: 12 }}
              content={
                <Paper elevation={10}>
                  <Box p={4}>Some JSX content</Box>
                </Paper>
              }
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
