---
id: CheckboxField
title: CheckboxField
---

```js live
<Store id="checkBoxForm">
  <Form>
    <Paper>
      <Box px={3} pt={2} pb={3} mb={2}>
        <CheckboxField name="abc" label="Example Editor" />
      </Box>
    </Paper>
  </Form>
  <StateInspector />
</Store>
```

```js live
<Store id="checkBoxFormView">
  <FormView>
    <Register>{materialViewComponents}</Register>
    <Fields>
      <Field name="abc" label="Example Editor" editor="checkbox" />
    </Fields>
    <Sections>
      <Section>{["abc"]}</Section>
    </Sections>
  </FormView>
  <StateInspector />
</Store>
```
