---
id: TabsField
title: TabsField
---

```js live
<Store id={"tabsFieldForm"}>
  <Form>
    <Register>
      {() => ({
        onTabChange: (e, store) => {
          console.log(e, store);
        }
      })}
    </Register>
    <Paper>
      <Box px={3} pt={2} pb={3} mb={2}>
        <TabsField name="abc" onTabChange="onTabChange">
          {[
            {
              label: <Box style={{ color: "red" }}>Red</Box>,
              content: <Box pt={1}>Red Content</Box>,
              value: "red"
            },
            {
              label: <Box style={{ color: "green" }}>Green</Box>,
              content: <Box pt={1}>Green Content</Box>,
              value: "green"
            },
            {
              label: <Box style={{ color: "blue" }}>Blue</Box>,
              content: <Box pt={1}>Blue Content</Box>,
              value: "blue"
            }
          ]}
        </TabsField>
      </Box>
    </Paper>
  </Form>
  <StateInspector />
</Store>
```

```js live
<Store id={"tabsFieldFormView"}>
  <FormView>
    <Register>{materialViewComponents}</Register>
    <Register>
      {() => ({
        onTabChange: (e, store) => {
          console.log(e, store);
        }
      })}
    </Register>
    <Fields>
      <Field
        name="abc"
        editor="tabs"
        onTabChange="onTabChange"
        tabs={[
          {
            label: <Box style={{ color: "red" }}>Red</Box>,
            content: <Box pt={1}>Red Content</Box>,
            value: "red"
          },
          {
            label: <Box style={{ color: "green" }}>Green</Box>,
            content: <Box pt={1}>Green Content</Box>,
            value: "green"
          },
          {
            label: <Box style={{ color: "blue" }}>Blue</Box>,
            content: <Box pt={1}>Blue Content</Box>,
            value: "blue"
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
