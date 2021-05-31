/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import { get, initStores } from "carry-on-store";
import Form from "../src/Form";
import Field from "../src/Field";

beforeEach(() => initStores());

it("should render <Field>", () => {
  expect(render(<Field />).asFragment()).toMatchSnapshot();
});

const formState = (formId = "form") => ({
  state: ({ get, set }) => ({
    [formId]: {
      initialValues: {
        field1: "value1",
        field2: "value2",
        checkbox: false
      },
      onSubmit: vals => {},
      onValidate: undefined,
      onReset: vals => {}
    }
  })
});

it("should render a simple input field", () => {
  const { asFragment } = render(
    <Form register={formState()}>
      <Field path="field1">
        {state => {
          expect(state).toMatchSnapshot("prop match");
          return <input {...state.element} />;
        }}
      </Field>
    </Form>
  );

  expect(asFragment()).toMatchSnapshot("render match");
  expect(get()).toMatchSnapshot("store match");
});

it("should render a simple input field in named form", () => {
  const { asFragment } = render(
    <Form id="theform" register={formState("theform")}>
      <Field path="field1">
        {state => {
          expect(state).toMatchSnapshot("prop match");
          return <input {...state.element} />;
        }}
      </Field>
    </Form>
  );

  expect(asFragment()).toMatchSnapshot("render match");
  expect(get()).toMatchSnapshot("store match");
});
