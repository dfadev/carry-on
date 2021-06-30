---
id: CurrencyField
title: CurrencyField
---

```js live
<Store id={"currencyFieldForm"}>
  <Form>
    <Paper>
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item>
            <CurrencyField name="USD" label="Example Editor" />
          </Grid>
          <Grid item>
            <CurrencyField name="GBP" label="Example Editor" symbol="\u00a3" />
          </Grid>
          <Grid item>
            <CurrencyField name="EUR" label="Example Editor" symbol="\u20ac" />
          </Grid>
          <Grid item>
            <CurrencyField name="YEN" label="Example Editor" symbol="\u00a5" />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  </Form>
  <StateInspector />
</Store>
```

```js live
<Store id={"currencyFieldFormView"}>
  <FormView>
    <Register>{materialViewComponents}</Register>
    <Fields>
      <Field name="USD" label="US Dollar Example Editor" editor="currency" />
      <Field
        name="GBP"
        label="UK Pound Example Editor"
        editor="currency"
        symbol="\u00a3"
      />
      <Field
        name="EUR"
        label="Euro Example Editor"
        editor="currency"
        symbol="\u20ac"
      />
      <Field
        name="YEN"
        label="Yen Example Editor"
        editor="currency"
        symbol="\u00a5"
      />
    </Fields>
    <Sections>
      <Section>{["USD", "GBP", "EUR", "YEN"]}</Section>
    </Sections>
  </FormView>
  <StateInspector />
</Store>
```
