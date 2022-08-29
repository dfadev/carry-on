/**
 * @jest-environment jsdom
 */
import React from "react";
import { initStores, register, connect, get, set } from "carry-on-store";
import { Store } from "carry-on-react";
import { render, act } from "@testing-library/react";
import Form from "../src/Form";
import Field from "../src/Field";
import plugin from "../src/plugin";

beforeEach(() => initStores());

it("should render <Form>", () => {
  expect(render(<Form />).asFragment()).toMatchSnapshot();
});

const formState = (formId = "form", opts) => ({
  state: ({ get, set }) => ({
    initialValues: {
      field1: "value1",
      field2: "value2",
      checkbox: false
    },
    ...opts
  })
});

it("should validate", async () => {
  let validateCalled = 0;
  //let thing;
  const { asFragment } = render(
    <Form
      register={formState()}
      onValidate={() => () => {
        validateCalled += 1;
      }}
    >
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

  act(() => get().form.setFieldValue("field1", "123"));
  await act(() => new Promise(r => setTimeout(r, 201)));

  expect(validateCalled).toBe(1);

  act(() => get().form.setFieldValue("field1", "345"));

  await act(() => new Promise(r => setTimeout(r, 201)));
  expect(validateCalled).toBe(2);
});

it("should handle hasError", () => {
  const { asFragment } = render(
    <Form register={formState()}>
      <Field path="field1">{state => <input {...state.element} />}</Field>
    </Form>
  );

  expect(get().form.hasError("field1")).toBe(false);
});

it("should handle setValues", () => {
  const { asFragment } = render(
    <Form register={formState()}>
      <Field path="field1">{state => <input {...state.element} />}</Field>
    </Form>
  );

  act(() => get().form.setValues({ field1: "zzz" }));

  expect(get().form.values).toStrictEqual({ field1: "zzz" });
});

it("should handle setInitialValues", () => {
  const { asFragment } = render(
    <Form register={formState()}>
      <Field path="field1" default="abc">
        {state => <input {...state.element} />}
      </Field>
    </Form>
  );

  act(() => get().form.setInitialValues({ thing: "1" }));

  expect(get().form.values).toStrictEqual({ thing: "1" });
});

it("should handle setInitialValues specified as a function", () => {
  const { asFragment } = render(
    <Form register={formState()}>
      <Field path="field1" default="abc">
        {state => <input {...state.element} />}
      </Field>
    </Form>
  );

  act(() => get().form.setInitialValues(() => ({ thing: "1" })));

  expect(get().form.values).toStrictEqual({ thing: "1" });
});

it("should handle setErrors", () => {
  const { asFragment } = render(
    <Form register={formState()}>
      <Field path="field1" default="abc">
        {state => <input {...state.element} />}
      </Field>
    </Form>
  );

  act(() => get().form.setErrors({}));

  expect(get().form.errors).toStrictEqual({});

  act(() => get().form.setErrors({ merge: false }));
  expect(get().form.errors).toStrictEqual(undefined);
});

it("should handle setTouched", () => {
  const { asFragment } = render(
    <Form register={formState()}>
      <Field path="field1" default="abc">
        {state => <input {...state.element} />}
      </Field>
    </Form>
  );

  act(() => get().form.setTouched({}));

  expect(get().form.touched).toStrictEqual({});

  act(() => get().form.setTouched({}, false));
  expect(get().form.touched).toStrictEqual({});
});

it("should handle reset specified as prop", () => {
  let onResetCalled = 0;
  const { asFragment } = render(
    <Form
      register={formState()}
      onReset={() => () => {
        onResetCalled += 1;
      }}
    >
      <Field path="field1" default="abc">
        {state => <input {...state.element} />}
      </Field>
    </Form>
  );

  let preventDefaultCalled = 0;
  act(() =>
    get().form.reset({
      preventDefault: () => {
        preventDefaultCalled += 1;
      }
    })
  );

  expect(onResetCalled).toBe(1);
  expect(preventDefaultCalled).toBe(1);
});

it("should handle reset stored in state", () => {
  let onResetCalled = 0;

  const { asFragment } = render(
    <Form
      register={formState("form", {
        onReset: () => {
          onResetCalled += 1;
        }
      })}
    >
      <Field path="field1" default="abc">
        {state => <input {...state.element} />}
      </Field>
    </Form>
  );

  act(() => get().form.reset());

  expect(onResetCalled).toBe(1);
});

it("should handle reset with no onReset", () => {
  const { asFragment } = render(
    <Form register={formState("form")}>
      <Field path="field1" default="abc">
        {state => <input {...state.element} />}
      </Field>
    </Form>
  );

  act(() => {
    get().form.setFieldValue("field1", "zzz");
    get().form.reset();
  });

  expect(get().form.values).toMatchSnapshot();
});

it("should handle validate onValidate stored in state", async () => {
  let onValidateCalled = 0;

  register({
    state: ({ get, set }) => ({
      form: {
        onValidate: () => {
          onValidateCalled += 1;
        }
      }
    })
  });

  const { asFragment } = render(
    <Form>
      <Field path="field1" default="abc">
        {state => <input {...state.element} />}
      </Field>
    </Form>
  );

  act(() => get().form.setFieldValue("field1", "zzz"));
  await act(() => new Promise(r => setTimeout(r, 201)));
  expect(onValidateCalled).toBe(1);
});

it("should handle submit specified as prop", async () => {
  let onSubmitCalled = 0;

  const { asFragment } = render(
    <Form
      register={formState()}
      onSubmit={() => () => {
        onSubmitCalled += 1;
        return true;
      }}
    >
      <Field path="field1" default="abc">
        {state => <input {...state.element} />}
      </Field>
    </Form>
  );

  act(() => get().form.setFieldValue("field1", "zzz"));
  await new Promise(r => setTimeout(r, 1));
  let preventDefaultCalled = 0;
  act(() =>
    get().form.submit({
      preventDefault: () => {
        preventDefaultCalled += 1;
      }
    })
  );
  await new Promise(r => setTimeout(r, 1));
  expect(onSubmitCalled).toBe(1);
  expect(preventDefaultCalled).toBe(1);
});

it("should handle submit stored as state", () => {
  let onSubmitCalled = 0;

  const { asFragment } = render(
    <Form
      register={formState("form", {
        onSubmit: () => {
          onSubmitCalled += 1;
        }
      })}
    >
      <Field path="field1" default="abc">
        {state => <input {...state.element} />}
      </Field>
    </Form>
  );

  act(() => get().form.submit());
  expect(onSubmitCalled).toBe(1);
});

it("should handle no onSubmit specified", async () => {
  const { asFragment } = render(
    <Form>
      <Field path="field1" default="abc">
        {state => <input {...state.element} />}
      </Field>
    </Form>
  );

  act(() => get().form.submit());
  await new Promise(r => setTimeout(r, 1));
  expect(get().form.isSubmitting).toBe(false);
});

it("should ignore submit when validating", async () => {
  let onSubmitCalled = 0;
  let onValidateCalled = 0;

  const { asFragment } = render(
    <Form
      register={formState()}
      onSubmit={() => () => {
        onSubmitCalled += 1;
      }}
      onValidate={() => () => {
        onValidateCalled += 1;
      }}
    >
      <Field path="field1" default="abc">
        {state => <input {...state.element} />}
      </Field>
    </Form>
  );

  act(() => {
    get().form.setFieldValue("field1", "def");
  });
  await act(() => new Promise(r => setTimeout(r, 201)));
  act(() => {
    get().form.setFieldValue("field1", "def");
  });
  await act(() => new Promise(r => setTimeout(r, 51)));
  act(() => {
    get().form.setFieldValue("field1", "def");
    get().form.submit();
  });
  await act(() => new Promise(r => setTimeout(r, 252)));

  expect(onSubmitCalled).toBe(1);
  expect(onValidateCalled).toBe(2);
});

it("should reset errors/visited/touched/isPristine after submit", async () => {
  let onSubmitCalled = 0;

  const { asFragment } = render(
    <Form
      register={formState()}
      onSubmit={() => () => {
        onSubmitCalled += 1;
        return true;
      }}
    >
      <Field path="field1" default="abc">
        {state => <input {...state.element} />}
      </Field>
    </Form>
  );

  act(() => {
    get().form.setFieldTouched("field1", true);
    get().form.setFieldVisited("field1", true);
    get().form.setFieldError("field1", "abc");
    get().form.submit();
  });
  await act(() => new Promise(r => setTimeout(r, 500)));

  expect(onSubmitCalled).toBe(1);

  expect(get().form.isPristine).toBe(true);
  expect(get().form.errors).toStrictEqual({});
  expect(get().form.visited).toStrictEqual({});
  expect(get().form.touched).toStrictEqual({});
});

it("should gracefully handle exception in submit", async () => {
  let onSubmitCalled = 0;
  let errorThrown = 0;

  const { asFragment } = render(
    <Form
      register={formState()}
      onSubmit={() => () => {
        onSubmitCalled += 1;
        return new Promise(() => {
          errorThrown += 1;
          throw new Error("test error");
        });
      }}
    >
      <Field path="field1" default="abc">
        {state => <input {...state.element} />}
      </Field>
    </Form>
  );

  act(() => get().form.submit());
  await new Promise(r => setTimeout(r, 500));

  expect(onSubmitCalled).toBe(1);
  expect(errorThrown).toBe(1);
  expect(get().form.isSubmitting).toBe(false);
});

it("renders store id", () => {
  expect(
    render(
      <Store id="zzz">
        <Form id="123" />
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});

it("handles initialValues specified as prop", () => {
  const { asFragment } = render(<Form initialValues={{ some: "stuff" }} />);

  expect(get()).toMatchSnapshot();
});

it("handles initialValues specified as a function", () => {
  const { asFragment } = render(
    <Form initialValues={() => ({ some: "stuff" })} />
  );

  expect(get()).toMatchSnapshot();
});

it("handles submit with no validate", () => {
  let onSubmitCalled = 0;
  const { asFragment } = render(
    <Form
      onSubmit={() => {
        onSubmitCalled += 1;
      }}
    />
  );
  act(() => get().form.submit());
  expect(onSubmitCalled).toBe(1);
});

it("should handle setValues using same values", () => {
  const { asFragment } = render(
    <Form register={formState()}>
      <Field path="field1">{state => <input {...state.element} />}</Field>
    </Form>
  );

  act(() => get().form.setValues(get().form.values));

  expect(get().form.values).toMatchSnapshot();
});
