---
id: Field
title: <Field>
---

## `Field`

Render a form field using form helpers passed to the render function.

## Properties

| Property               | Description                                                                                                                |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `render` or `children` | The render function. This function will be called with the state as it's first parameter.                                  |
| `from`                 | What store to retrieve state from.                                                                                         |
| `form`                 | What form to retrieve state from.                                                                                          |
| `path`                 | The state path to retrieve. Specified as a dotted path string, with support for arrays. Sample: `"my.field.path[10].name"` |
| `constant`             | When true, the `Field` component will query state and render only once.                                                    |
| `default`              | The default value when the state is undefined.                                                                             |
| `debug`                | When true, log messages regarding state changes will be printed to the `console`.                                          |
| `verbose`              | When true, verbose log messages are printed to the `console`.                                                              |
| `id`                   | Debug log uses this to identify components                                                                                 |
| `onMount`              | Called with the current state when the component mounts.                                                                   |
| `onUnmount`            | Called with the current state when the component unmounts.                                                                 |
| `type`                 | When type is set to `checkbox` or `radio`, the value is emitted as a `checked` attribute instead of a `value` attribute.   |

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
