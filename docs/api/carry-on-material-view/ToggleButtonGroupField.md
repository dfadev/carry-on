---
id: ToggleButtonGroupField
title: ToggleButtonGroupField
---

```js live
<Store id="toggleButtonGroupForm">
  <Register>
    {{
      thing: 1
    }}
  </Register>
  <Form>
    <Register>
      {{
        onChange: (e, store) => {
          console.log(e, store);
        }
      }}
    </Register>
    <Paper>
      <Box px={3} pt={2} pb={3} mb={2}>
        <ToggleButtonGroupField
          name="abc"
          label="Example Editor"
          onChange="onChange"
          buttons={[
            { value: 1, content: "Toggle 1" },
            { value: 2, content: "Toggle 2" },
            { value: 3, content: "Toggle 3" }
          ]}
        />
      </Box>
    </Paper>
  </Form>
  <StateInspector />
</Store>
```

```js live
<Store id="toggleButtonGroupFormView">
  <FormView>
    <Register>{materialViewComponents}</Register>
    <Fields>
      <Field
        name="abc"
        label="Example Editor"
        editor="toggleButtonGroup"
        buttons={[
          { value: 1, content: "Toggle 1" },
          { value: 2, content: "Toggle 2" },
          { value: 3, content: "Toggle 3" }
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
