# carry-on-forms

```carry-on``` plugin to add React form components

### Usage

```JavaScript
import { register, State } from "carry-on-react";
import { form, Form, FormButtons, Field } from "carry-on-react-forms";

register({
  state: {
    siteConfig: {
      name: "Hello World",
      byline: "the timeless greeting"
    }
  }
});

register({
  state: ({ dispatch }) => ({
    counter: {
      value: 0,
      inc: () => dispatch(state => void state.counter.value++, "Inc"),
      dec: () => dispatch(state => void state.counter.value--, "Dec")
    }
  })
});

register(
  form({
    init: {
      field: "value",
      checkbox: false,
      slowfield: "zzz"
    },
    onSubmit: ({ dispatch, query }) => values => true,
    onReset: ({ dispatch, query }) => values => {},
    onValidate: ({ dispatch, query }) => vals =>
      new Promise((resolve, reject) => {
        resolve({
          isValid: true,
          errors: {
            field: "invalid"
          }
        });
      })
  })
);

const App = () => (
  <div>
    <State constant>
      {({ siteConfig: { name, byline } }) => (
        <>
          <h1>{name}</h1>
          <h6>{byline}</h6>
        </>
      )}
    </State>
    <hr />
    <h4>Magical Counter</h4>
    <State debounce={500}>
      {({ counter: { value, inc, dec } }) => (
        <>
          <div>{value}</div>
          <button onClick={inc}>inc</button>
          <button onClick={dec}>dec</button>
        </>
      )}
    </State>
    <hr />
    <Form>
      <Field path="field">
        {({ element, touched, error }) => (
          <div>
            <input {...element} />
            {touched && error && <div>{error}</div>}
          </div>
        )}
      </Field>
      <hr />
      <Field path="checkbox" type="checkbox">
        {({ element, touched, error }) => (
          <div>
            <input type="checkbox" {...element} />
            {touched && error && <div>{error}</div>}
          </div>
        )}
      </Field>
      <hr />
      <Field path="slowfield" throttle={1000}>
        {({ element, touched, error }) => (
          <div>
            <input {...element} />
            {touched && error && <div>{error}</div>}
          </div>
        )}
      </Field>
      <hr />
      <FormButtons>
        {({ submit, reset }) => (
          <div>
            <button {...submit}>submit</button>
            <button {...reset}>reset</button>
          </div>
        )}
      </FormButtons>
      <hr />
    </Form>
  </div>
);


```
