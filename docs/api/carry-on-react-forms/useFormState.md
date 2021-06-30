---
id: useFormState
title: useFormState
---

Retrieves form state.

```js live noInline
const FnComp = () => {
  const { form, store, prefix } = useFormState();

  const f = useField({ path: "contacts" });

  const fm = useForm(s => s.values);

  console.log(form, store, prefix);
  return (
    <div>
      <Inspector data={form} />
      <Inspector data={store} />
      <Inspector data={prefix} />
      <Inspector data={f} />
      <Inspector data={fm} />
    </div>
  );
};

render(
  <Store id="useFormStateStore">
    <Paper>
      <Form id="useFormStateForm">
        <InitialValues>
          {{
            contacts: [
              {
                name: "John Johnson",
                phone: "+44 7911 123456",
                email: "jj@co.uk"
              },
              { name: "Jan Jansen", phone: "7025551212", email: "jj@lv.nv" }
            ]
          }}
        </InitialValues>
        <ListField name="contacts" label="Contact Editor">
          <FnComp />
          <Box my={1} p={1} pt={0}>
            <Box>
              Sample Greeting:{" "}
              <h4>
                Hello <DataField name="name" />!
              </h4>
            </Box>
            <TextField name="name" label="Name" />
            <PhoneField name="phone" label="Phone" defaultCountry="US" />
            <TextField name="email" label="Email" />
          </Box>
        </ListField>
      </Form>
    </Paper>
  </Store>
);
```
