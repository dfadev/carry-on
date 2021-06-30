---
id: SubmitIconField
title: SubmitIconField
---

```js live
<Store id={"submitIconFieldForm"}>
  <Form>
    <Paper>
      <Box px={3} pt={2} pb={3} mb={2}>
        <SubmitIconField name="abc" label={<PublishIcon />} />
      </Box>
    </Paper>
  </Form>
  <StateInspector />
</Store>
```

```js live
<Store id={"submitIconFieldFormView"}>
  <FormView>
    <Register>{materialViewComponents}</Register>
    <Fields>
      <Field name="abc" label={<PublishIcon />} editor="submitIcon" />
    </Fields>
    <Sections>
      <Section>{["abc"]}</Section>
    </Sections>
  </FormView>
  <StateInspector />
</Store>
```
