---
id: ButtonField
title: ButtonField
---

```js live
<Store id={"buttonFieldForm"}>
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
        <ButtonField
          name="abc"
          label="Example Button"
          onClick="clickHandler"
        />
      </Box>
    </Paper>
  </Form>
  <StateInspector />
</Store>
```

```js live
<Store id={"buttonFieldFormView"}>
  <FormView>
    <Register>{materialViewComponents}</Register>
    <Register>
      {() => ({
        clickHandler: (e, store) => {
          console.log(e, store);
        }
      })}
    </Register>
    <Fields>
      <Field
        name="abc"
        label="Example Button"
        editor="button"
        onClick="clickHandler"
      />
    </Fields>
    <Sections>
      <Section>{["abc"]}</Section>
    </Sections>
  </FormView>
  <StateInspector />
</Store>
```
