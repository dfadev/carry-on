---
id: ContentField
title: ContentField
---

```js live
<Store id={"contentFieldForm"}>
  <Form>
    <Paper>
      <Box px={3} pt={2} pb={3} mb={2}>
        <ContentField
          name="abc"
          content={
            <Paper elevation={10}>
              <Box p={2}>Some JSX content</Box>
            </Paper>
          }
          editor="content"
        />
      </Box>
    </Paper>
  </Form>
  <StateInspector />
</Store>
```

```js live
<Store id={"contentFieldFormView"}>
  <FormView>
    <Register>{materialViewComponents}</Register>
    <Fields>
      <Field
        name="abc"
        editor="content"
        view={{ xs: 12 }}
        content={
          <Paper elevation={10}>
            <Box p={4}>Some JSX content</Box>
          </Paper>
        }
      />
    </Fields>
    <Sections>
      <Section>{["abc"]}</Section>
    </Sections>
  </FormView>
  <StateInspector />
</Store>
```
