# carry-on-forms

```carry-on``` plugin to add React form components

### Usage

```JavaScript
import { Store } from "carry-on-react";
import { form, Form, FormState, Field } from "carry-on-react-forms";

const init = {
  field: "value",
  checkbox: false
};

const validate = vals =>
  new Promise((resolve, reject) => {
    resolve({});
  });

const onSubmit = () => true;

const onReset = () => {};

const App = () => (
  <Store
    id="myStore"
    plugins={[form({ id: "form1", init, validate, onSubmit, onReset })]}
  >
    <Form store="myStore" form="form1">
      <Field store="myStore" form="form1" path="field">
        {field => (
          <div>
            <input {...field.element} />
            {field.touched && field.error && <div>{field.error}</div>}
          </div>
        )}
      </Field>
      <Field store="myStore" form="form1" path="checkbox" type="checkbox">
        {field => (
          <div>
            <input type="checkbox" {...field.element} />
            {field.touched && field.error && <div>{field.error}</div>}
          </div>
        )}
      </Field>
      <FormState
        select={({ submit, reset, isPristine, isValidating, isValid }) => ({
          submit,
          reset,
          disableSubmit: isPristine || isValidating || !isValid,
          disableReset: isPristine || isValidating
        })}
        store="myStore"
        form="form1"
      >
        {({ submit, reset, disableSubmit, disableReset }) => (
          <div>
            <button disabled={disableSubmit} onClick={submit}>
              submit
            </button>
            <button disabled={disableReset} onClick={reset}>
              reset
            </button>
          </div>
        )}
      </FormState>
    </Form>
  </Store>
);

```
