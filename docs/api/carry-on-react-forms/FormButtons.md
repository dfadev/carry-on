---
id: FormButtons
title: <FormButtons>
---

## `FormButtons`

Render form buttons using form helpers passed to the render function.

If this component doesn't have a parent `Form` component, you must use the `form` and `store` properties to choose a form.

## Properties

| Property          | Description                                                                       |
| ----------------- | --------------------------------------------------------------------------------- |
| `children`        | Render function, see below                                                        |
| `from` or `store` | What store to retrieve state from.                                                |
| `form`            | What form to retrieve state from.                                                 |
| `throttle`        | Milliseconds to throttle change requests                                          |
| `debounce`        | Milliseconds to debounce change requests                                          |
| `debug`           | When true, log messages regarding state changes will be printed to the `console`. |
| `verbose`         | When true, verbose log messages are printed to the `console`.                     |
| `id`              | Debug log uses this to identify components                                        |
| `onMount`         | Called with the current state when the component mounts.                          |
| `onUnmount`       | Called with the current state when the component unmounts.                        |

## render({ submit, reset })

The render function receives an object containing form button attributes to use on button elements.

| Button | Attribute | Description               |
| ------ | --------- | ------------------------- |
| submit | onClick   | Event handler             |
|        | disabled  | Is submit button disabled |
|        |           |                           |
| reset  | onClick   | Event handler             |
|        | disabled  | Is reset button disabled  |

```js live noInline
import { Form, Field, FormButtons, FormState } from "carry-on-react-forms";

const storeId = "forms";

const myForm = {
  id: "examples.myForm",
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
