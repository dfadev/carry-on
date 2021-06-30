---
id: SelectField
title: SelectField
---

```js live
<Store id={"selectFieldForm"}>
  <Form>
    <Paper>
      <Box px={3} pt={2} pb={3} mb={2}>
        <SelectField
          name="abc"
          label="Example Editor"
          fullWidth
          options={[
            { value: "red", label: <span style={{ color: "red" }}>Red</span> },
            {
              value: "green",
              label: <span style={{ color: "green" }}>Green</span>
            },
            {
              value: "blue",
              label: <span style={{ color: "blue" }}>Blue</span>
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
<Store id={"selectFieldFormView"}>
  <FormView>
    <Register>{materialViewComponents}</Register>
    <Fields>
      <Field
        name="abc"
        label="Example Editor"
        editor="select"
        fullWidth
        view={{ xs: 12 }}
        options={[
          { value: "red", label: <span style={{ color: "red" }}>Red</span> },
          {
            value: "green",
            label: <span style={{ color: "green" }}>Green</span>
          },
          { value: "blue", label: <span style={{ color: "blue" }}>Blue</span> }
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
