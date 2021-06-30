---
id: RadioField
title: RadioField
---

```js live
<Store id={"radioFieldForm"}>
  <Form>
    <Paper>
      <Box px={3} pt={2} pb={3} mb={2}>
        <RadioField
          name="abc"
          label="Example Editor"
          fullWidth
          options={[
            {
              value: "red",
              label: <Box style={{ color: "red" }}>Red</Box>
            },
            {
              value: "green",
              label: <Box style={{ color: "green" }}>Green</Box>
            },
            {
              value: "blue",
              label: <Box style={{ color: "blue" }}>Blue</Box>
            }
          ]}
        />
      </Box>
    </Paper>
  </Form>
  <StateInspector />
</Store>
```

```js live
<Store id={"radioFieldFormView"}>
  <FormView id="myForm">
    <Register>{materialViewComponents}</Register>
    <Fields>
      <Field
        name="abc"
        label="Example Editor"
        editor="radio"
        fullWidth
        view={{ xs: 12 }}
        options={[
          {
            value: "red",
            label: <Box style={{ color: "red" }}>Red</Box>
          },
          {
            value: "green",
            label: <Box style={{ color: "green" }}>Green</Box>
          },
          {
            value: "blue",
            label: <Box style={{ color: "blue" }}>Blue</Box>
          }
        ]}
      />
    </Fields>
    <Sections>
      <Section>{["abc"]}</Section>
    </Sections>
  </FormView>
  <StateInspector />
</Store>
```
