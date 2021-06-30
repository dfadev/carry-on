---
id: SwitchField
title: SwitchField
---

```js live
<Store id="switchForm">
  <Form>
    <Paper>
      <Box px={3} pt={2} pb={3} mb={2}>
        <SwitchField name="abc" label="Example Editor" />
      </Box>
    </Paper>
  </Form>
  <StateInspector />
</Store>
```

```js live
<Store id="switchFormView">
  <FormView>
    <Register>{materialViewComponents}</Register>
    <Fields>
      <Field name="abc" label="Example Editor" editor="switch" />
    </Fields>
    <Sections>
      <Section>{["abc"]}</Section>
    </Sections>
  </FormView>
  <StateInspector />
</Store>
```
