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
    initialValues: {
      field1: "value1",
      field2: "value2",
      checkbox: false
    },
    onSubmit: vals => {},
    onValidate: undefined,
    onReset: vals => {}
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

it("should handle onChange", () => {
  let onChange;
  const { asFragment } = render(
    <Form id="theform" register={formState("theform")}>
      <Field path="field1">
        {state => {
          onChange = state.element.onChange;
          return <input {...state.element} />;
        }}
      </Field>
    </Form>
  );

  onChange({
    target: {
      type: "number",
      value: 0
    }
  });

  expect(asFragment()).toMatchSnapshot();

  onChange({
    target: {
      type: "number",
      value: NaN
    }
  });

  expect(asFragment()).toMatchSnapshot();

  onChange({
    target: {
      type: "checkbox",
      checked: true
    }
  });

  expect(asFragment()).toMatchSnapshot();

  onChange({
    target: {
      value: ""
    }
  });

  expect(asFragment()).toMatchSnapshot();
});

it("should handle onFocus", () => {
  let onFocus;
  const { asFragment } = render(
    <Form id="theform" register={formState("theform")}>
      <Field path="field1">
        {state => {
          onFocus = state.element.onFocus;
          return <input {...state.element} />;
        }}
      </Field>
    </Form>
  );

  onFocus();
  expect(get().theform.visited.field1).toBe(true);
});

it("should handle onBlur", () => {
  let onBlur;
  const { asFragment } = render(
    <Form id="theform" register={formState("theform")}>
      <Field path="field1">
        {state => {
          onBlur = state.element.onBlur;
          return <input {...state.element} />;
        }}
      </Field>
    </Form>
  );

  onBlur();
  expect(get().theform.touched.field1).toBe(true);
});

it("should handle setValue", () => {
  let setValue;
  const { asFragment } = render(
    <Form id="theform" register={formState("theform")}>
      <Field path="field1">
        {state => {
          setValue = state.setValue;
          return <input {...state.element} />;
        }}
      </Field>
    </Form>
  );

  setValue("123");
  expect(get().theform.values.field1).toBe("123");
});

it("should handle setVisited", () => {
  let setVisited;
  const { asFragment } = render(
    <Form id="theform" register={formState("theform")}>
      <Field path="field1">
        {state => {
          setVisited = state.setVisited;
          return <input {...state.element} />;
        }}
      </Field>
    </Form>
  );

  setVisited(true);
  expect(get().theform.visited.field1).toBe(true);
});

it("should handle setTouched", () => {
  let setTouched;
  const { asFragment } = render(
    <Form id="theform" register={formState("theform")}>
      <Field path="field1">
        {state => {
          setTouched = state.setTouched;
          return <input {...state.element} />;
        }}
      </Field>
    </Form>
  );

  setTouched(true);
  expect(get().theform.touched.field1).toBe(true);
});

it("should handle setError", () => {
  let setError;
  const { asFragment } = render(
    <Form id="theform" register={formState("theform")}>
      <Field path="field1">
        {state => {
          setError = state.setError;
          return <input {...state.element} />;
        }}
      </Field>
    </Form>
  );

  setError(true);
  expect(get().theform.errors.field1).toBe(true);
});

it("should handle radio", () => {
  const { asFragment } = render(
    <Form id="theform" register={formState("theform")}>
      <Field path="checkbox" type="checkbox">
        {state => {
          expect(state.element.checked).toBe(false);
          return <input {...state.element} />;
        }}
      </Field>
    </Form>
  );
});
