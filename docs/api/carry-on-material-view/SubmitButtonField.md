---
id: SubmitButtonField
title: SubmitButtonField
---

```js live
<Store id={"submitButtonFieldForm"}>
  <Form>
    <Paper>
      <Box px={3} pt={2} pb={3} mb={2}>
        <SubmitButtonField name="abc" label="Submit" />
      </Box>
    </Paper>
  </Form>
  <StateInspector />
</Store>
```

```js live
<Store id={"submitButtonFieldFormView"}>
  <FormView>
    <Register>{materialViewComponents}</Register>
    <Fields>
      <Field name="abc" label="Submit" editor="submit" />
    </Fields>
    <Sections>
      <Section>{["abc"]}</Section>
    </Sections>
  </FormView>
  <StateInspector />
</Store>
```
