---
id: FabField
title: FabField
---

```js live
<Store id={"fabFieldForm"}>
  <Form>
    <Paper>
      <Box px={3} pt={2} pb={3} mb={2}>
        <FabField name="abc" label={<PublishIcon />} />
      </Box>
    </Paper>
  </Form>
  <StateInspector />
</Store>
```

```js live
<Store id={"fabFieldFormView"}>
  <FormView>
    <Register>{materialViewComponents}</Register>
    <Fields>
      <Field
        name="abc"
        label={<PublishIcon />}
        editor="fab"
      />
    </Fields>
    <Sections>
      <Section>{["abc"]}</Section>
    </Sections>
  </FormView>
  <StateInspector />
</Store>
```
