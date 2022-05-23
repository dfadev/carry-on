/**
 * @jest-environment jsdom
 */
import React from "react";
import { initStores } from "carry-on-store";
import { render } from "@testing-library/react";
import { Paper, Box, Grid } from "@mui/material";
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
import CurrencyField from "../src/CurrencyField";

beforeEach(() => {
  initStores();
});

it("should render <CurrencyField> inside a Form", () => {
  let clickCount = 0;
  expect(
    render(
      <Store id={"currencyFieldForm"}>
        <Form>
          <Paper>
            <Box p={3}>
              <Grid container spacing={3}>
                <Grid item>
                  <CurrencyField name="USD" label="Example Editor" />
                </Grid>
                <Grid item>
                  <CurrencyField
                    name="GBP"
                    label="Example Editor"
                    symbol="\u00a3"
                  />
                </Grid>
                <Grid item>
                  <CurrencyField
                    name="EUR"
                    label="Example Editor"
                    symbol="\u20ac"
                  />
                </Grid>
                <Grid item>
                  <CurrencyField
                    name="YEN"
                    label="Example Editor"
                    symbol="\u00a5"
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Form>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});

it("should render <CurrencyField> inside a FormView", () => {
  expect(
    render(
      <Store id={"currencyFieldFormView"}>
        <FormView>
          <Register>{materialViewComponents}</Register>
          <Fields>
            <Field
              name="USD"
              label="US Dollar Example Editor"
              editor="currency"
            />
            <Field
              name="GBP"
              label="UK Pound Example Editor"
              editor="currency"
              symbol="\u00a3"
            />
            <Field
              name="EUR"
              label="Euro Example Editor"
              editor="currency"
              symbol="\u20ac"
            />
            <Field
              name="YEN"
              label="Yen Example Editor"
              editor="currency"
              symbol="\u00a5"
            />
          </Fields>
          <Sections>
            <Section>{["USD", "GBP", "EUR", "YEN"]}</Section>
          </Sections>
        </FormView>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});
