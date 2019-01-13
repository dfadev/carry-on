test("", () => {
});

/*
const formData = {
  name: "",
  field1: "val1",
  field2: "val2",
  checkbox: false
};

const formId = "myForm";

const name = props => {
  console.log("rendering name", props);
  return (
    <div>
      Name:
      <input type="text" {...props.element} />
    </div>
  );
};

const field1 = props => {
  console.log("rendering field1", props);
  return (
    <div>
      Field1:
      <input type="text" {...props.element} />
    </div>
  );
};

const field2 = props => {
  console.log("rendering field2", props);
  return (
    <div>
      <div>
        Field2:
        <input type="text" {...props.element} />
      </div>
      <div>{JSON.stringify(props)}</div>
    </div>
  );
};

const checkbox = props => {
  console.log("rendering checkbox", props);
  return (
    <div>
      <div>
        Checkbox:
        <input type="checkbox" {...props.element} />
      </div>
      <div>{JSON.stringify(props)}</div>
    </div>
  );
};

const formButtons = ({ submit, reset, disableSubmit, disableReset }) => {
  console.log("rendering submit/reset buttons");
  return (
    <div>
      <button disabled={disableSubmit} onClick={submit(onSubmit)}>
        submit
      </button>
      <button disabled={disableReset} onClick={reset()}>
        reset
      </button>
    </div>
  );
};

const formDump = state => (
  <div>
    <div>{new Date().toString()}</div>
    <div>{JSON.stringify(state)}</div>
  </div>
);

const onSubmit = vals => {
  return true;
};

const onReset = () => {};

const onValidate = vals => {
  console.log("validate", vals);
  const errs = {};
  if (vals.field2 !== "val2") errs.field2 = "bad input";

  return errs;
  //return Promise.resolve(errs);
};

const TestForm = ({ header, store, form }) => (
  <div>
    <h1>{header}</h1>
    <Form store={store} form={form} onSubmit={onSubmit} onReset={onReset}>
      <Field store={store} form={form} path="name">
        {name}
      </Field>
      <Field store={store} form={form} path="field1">
        {field1}
      </Field>
      <Field store={store} form={form} path="field2">
        {field2}
      </Field>
      <Field store={store} form={form} path="checkbox" type="checkbox">
        {checkbox}
      </Field>
      <FormState
        select={({ submit, reset, isPristine, isValidating, isValid }) => ({
          submit,
          reset,
          disableSubmit: isPristine || isValidating || !isValid,
          disableReset: isPristine || isValidating
        })}
        store={store}
        form={form}
      >
        {formButtons}
      </FormState>
      <FormState store={store} form={form}>
        {formDump}
      </FormState>
    </Form>
  </div>
);

register(devTools(), "myStore");

const App = () => (
  <Store
    id="myStore"
    plugins={[
      form({ id: "form1", init: formData, validate: onValidate }),
      form({ id: "form2", init: formData, validate: onValidate })
    ]}
  >
    <TestForm header="Form1" store="myStore" form="form1" />
    <TestForm header="Form2" store="myStore" form="form2" />
  </Store>
);

*/
