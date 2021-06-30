---
id: PhoneField
title: PhoneField
---

```js live
<Store id={"phoneFieldForm"}>
  <Form>
    <InitialValues>
      {{
        phone1: "7025551212",
        phone2: "447911123456"
      }}
    </InitialValues>
    <Paper>
      <Box px={3} pt={2} pb={3} mb={2}>
        <PhoneField name="phone1" label="US Phone" />
        <PhoneField name="phone2" label="GB Phone" defaultCountry="GB" />
      </Box>
    </Paper>
  </Form>
  <StateInspector />
</Store>
```

```js live
<Store id={"phoneFieldFormView"}>
  <FormView>
    <Register>{materialViewComponents}</Register>
    <Fields>
      <Field name="phone1">
        {{
          label: "US Phone",
          editor: "phone"
        }}
      </Field>
      <Field name="phone2">
        {{
          label: "UK Phone",
          editor: "phone",
          defaultCountry: "GB"
        }}
      </Field>
    </Fields>
    <Sections>
      <Section>{["phone1", "phone2"]}</Section>
    </Sections>
  </FormView>
  <StateInspector />
</Store>
```
