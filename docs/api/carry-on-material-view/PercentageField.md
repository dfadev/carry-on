---
id: PercentageField
title: PercentageField
---

```js live
<Store id={"percentageFieldForm"}>
  <Form>
    <Paper>
      <Box px={3} pt={2} pb={3} mb={2}>
        <PercentageField name="abc" label="Example Editor" />
      </Box>
    </Paper>
  </Form>
  <StateInspector />
</Store>
```

```js live
<Store id={"percentageFieldFormView"}>
  <FormView>
    <Register>{materialViewComponents}</Register>
    <Fields>
      <Field name="abc" label="Example Editor" editor="percentage" />
    </Fields>
    <Sections>
      <Section>{["abc"]}</Section>
    </Sections>
  </FormView>
  <StateInspector />
</Store>
```
