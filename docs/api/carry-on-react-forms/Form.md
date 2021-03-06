---
id: Form
title: <Form>
---

Register a form with a state container.

## Properties

| Property        | Description                                                                       |
| --------------- | --------------------------------------------------------------------------------- |
| `children`      | Must be a React Node                                                              |
| `from`          | What store to retrieve state from.                                                |
| `id`            | The key used to identify this form in the state container                         |
| `register`      | Register states                                                                   |
| `debug`         | When true, log messages regarding state changes will be printed to the `console`. |
| `verbose`       | When true, verbose log messages are printed to the `console`.                     |
| `onMount`       | Called with the current form state when the component mounts.                     |
| `onUnmount`     | Called with the current form state when the component unmounts.                   |
| `initialValues` | Initial form values                                                               |
| `onValidate`    | Validation callback                                                               |
| `onSubmit`      | Form submit callback                                                              |
| `onReset`       | Form reset callback                                                               |

```js live noInline
import { Form, Field, FormButtons, FormState } from "carry-on-react-forms";

const storeId = "forms";

const myForm = {
  id: "examples.Form",
  initialValues: {
    field1: "value1",
    field2: "value2"
  },
  onValidate:
    ({ get, set, id }) =>
    values => ({
      errors: {},
      isValid: true
    }),
  onSubmit:
    ({ get, set, id }) =>
    values => {
      alert(JSON.stringify(values));
    }
};

render(
  <Form {...myForm} from={storeId}>
    {/* Form Controls */}
    <Field path="field1">{({ element }) => <input {...element} />}</Field>
    <Field path="field2">{({ element }) => <input {...element} />}</Field>
    <FormButtons>
      {({ submit, reset }) => (
        <>
          <div>
            <button {...submit}>Submit</button>
            <button {...reset}>Reset</button>
          </div>
        </>
      )}
    </FormButtons>
    {/********************/}

    {/* State Inspectors */}
    <h4>State:</h4>
    <h5>field1:</h5>
    <Field path="field1">{field => <Inspector data={field} />}</Field>
    <h5>field2:</h5>
    <Field path="field2">{field => <Inspector data={field} />}</Field>
    <FormButtons>
      {({ submit, reset }) => (
        <>
          <h5>
            <i>submit</i>:
          </h5>
          <Inspector data={submit} />
          <h5>
            <i>reset</i>:
          </h5>
          <Inspector data={reset} />
        </>
      )}
    </FormButtons>
    <FormState>
      {form => (
        <>
          <h5>Form state:</h5>
          <Inspector data={form} />
        </>
      )}
    </FormState>
    <h5>Store state:</h5>
    <StateInspector from={storeId} />
    {/********************/}
  </Form>
);
```
