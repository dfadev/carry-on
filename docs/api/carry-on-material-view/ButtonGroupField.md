---
id: ButtonGroupField
title: ButtonGroupField
---

```js live
<Store id="buttonGroupForm">
  <Form>
    <Register>
      {() => ({
        clickHandler: (e, store) => {
          console.log(e, store);
        }
      })}
    </Register>
    <Paper>
      <Box px={3} pt={2} pb={3} mb={2}>
        <ButtonGroupField
          name="abc"
          buttons={[
            {
              value: 1,
              content: <Box style={{ color: "red" }}>Red</Box>,
              onClick: "clickHandler"
            },
            {
              value: 2,
              content: <Box style={{ color: "green" }}>Green</Box>,
              onClick: "clickHandler"
            },
            {
              value: 3,
              content: <Box style={{ color: "blue" }}>Blue</Box>,
              onClick: "clickHandler"
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
<Store id="buttonGroupFormView">
  <FormView>
    <Register>{materialViewComponents}</Register>
    <Fields>
      <Field
        name="abc"
        editor="buttonGroup"
        buttons={[
          { value: 1, content: <Box style={{ color: "red" }}>Red</Box> },
          { value: 2, content: <Box style={{ color: "green" }}>Green</Box> },
          { value: 3, content: <Box style={{ color: "blue" }}>Blue</Box> }
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
