---
id: ImageField
title: ImageField
---

```js live
<Store id={"imageFieldForm"}>
  <Form>
    <InitialValues>{{ abc: sampleBase64Image }}</InitialValues>
    <Paper>
      <Box px={3} pt={2} pb={3} mb={2}>
        <ImageField name="abc" label="Example Editor" />
      </Box>
    </Paper>
  </Form>
  <StateInspector />
</Store>
```

```js live
<Store id={"imageFieldFormView"}>
  <FormView>
    <Register>{materialViewComponents}</Register>
    <InitialValues>{{ abc: sampleBase64Image }}</InitialValues>
    <Fields>
      <Field name="abc" label="Example Editor" editor="image" />
    </Fields>
    <Sections>
      <Section>{["abc"]}</Section>
    </Sections>
  </FormView>
  <StateInspector />
</Store>
```
