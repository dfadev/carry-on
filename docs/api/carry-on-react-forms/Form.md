---
id: Form
title: Form
---

## Import

```js
import { Form } from "carry-on-react-forms";
```

## `Form`

```js live noInline
const storeId = "form";

const formStateFactory = (formId = "form") => ({
  state: ({ get, set }) => ({
    [formId]: {
      initialValues: {
        field1: "value1",
        field2: "value2"
      },
      onSubmit(vals) {
        alert(JSON.stringify(vals));
      }
    }
  })
});

render(
  <>
    <Form id="myForm" store={storeId} register={formStateFactory("myForm")}>
      <div>
        <Field path="field1">{({ element }) => <input {...element} />}</Field>
      </div>
      <div>
        <Field path="field2">{({ element }) => <input {...element} />}</Field>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </Form>
    <StateInspector from={storeId} />
  </>
);
```
