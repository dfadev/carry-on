---
id: DateTimeField
title: DateTimeField
---

```js live
<Store id={"dateTimeFieldForm"}>
  <Form>
    <Paper>
      <Box px={3} pt={2} pb={3} mb={2}>
        <DateTimeField
          name="abc"
          label="Example Editor"
          keyboard={false}
          format="MM/dd/yyyy hh:mm a"
        />
      </Box>
    </Paper>
  </Form>
  <StateInspector />
</Store>
```

```js live
<Store id={"dateTimeFieldFormView"}>
  <FormView>
    <Register>{materialViewComponents}</Register>
    <Fields>
      <Field
        name="abc"
        label="Example Editor"
        editor="dateTime"
        keyboard={false}
        format="MM/dd/yyyy hh:mm a"
      />
    </Fields>
    <Sections>
      <Section>{["abc"]}</Section>
    </Sections>
  </FormView>
  <StateInspector />
</Store>
```
