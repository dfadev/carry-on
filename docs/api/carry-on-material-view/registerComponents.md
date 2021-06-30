---
id: registerComponents
title: registerComponents
---

```js live noInline
const storeId = "registerComponentsStore";

registerComponents(storeId);

const icon1 = () => (
  <svg x="0px" y="0px" viewBox="0 0 60 60" height="24px">
    <g>
      <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z" />
      <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z" />
    </g>
  </svg>
);

const icon2 = () => <img src="https://via.placeholder.com/16/FF0000" />;

render(
  <Store id={storeId}>
    <FormView
      id="formViewRegisterComponents"
      onMount={p => {
        console.log("onMount", p);
        p.setFieldError("abc", "error message");
      }}
    >
      <View spacing={5} />
      <Section>
        {{
          alignItems: "center"
        }}
      </Section>
      <InitialValues>
        {{
          abc: "abc",
          ghi: true,
          jkl: true
        }}
      </InitialValues>
      <Sections>
        <Section title="Section 1">{["abc", "def"]}</Section>
        <Section title="Section 2">{[["ghi"], ["jkl"]]}</Section>
        <Section title="Section 3">{["btn1", "iconBtn1", "iconBtn2"]}</Section>
        <Section title="Section 4">{["cy1"]}</Section>
        <Section title="Section 5">{["ssn1", "ein1"]}</Section>
        <Section title="Section 6">
          {["percentage1", "percentage2", "percentage3"]}
        </Section>
        <Section title="Section 7">{["phone1", "phone2"]}</Section>
        <Section title="Section 8">{["zipCode1"]}</Section>
        <Section title="Section 9">{["submit1", "reset1"]}</Section>
      </Sections>
      <Fields>
        <Field name="abc">
          {{
            label: "ABC",
            editor: "text",
            fullWidth: true,
            view: {
              xs: 6
            }
          }}
        </Field>
        <Field name="def">
          {{
            label: "DEF",
            editor: "text",
            fullWidth: true,
            view: {
              xs: 6
            }
          }}
        </Field>
        <Field name="ghi">
          {{
            label: "GHI",
            editor: "checkbox"
          }}
        </Field>
        <Field name="jkl">
          {{
            label: "JKL",
            disabled: true,
            editor: "checkbox"
          }}
        </Field>
        <Field name="btn1">
          {{
            label: "Press Me",
            editor: "button"
          }}
        </Field>
        <Field name="iconBtn1">
          {{
            label: icon1,
            editor: "iconButton"
          }}
        </Field>
        <Field name="iconBtn2">
          {{
            label: icon2,
            editor: "iconButton"
          }}
        </Field>
        <Field name="cy1">
          {{
            label: "Dollars",
            editor: "currency"
          }}
        </Field>
        <Field name="ssn1">
          {{
            label: "SSN",
            editor: "ssn"
          }}
        </Field>
        <Field name="ein1">
          {{
            label: "EIN",
            editor: "ein"
          }}
        </Field>
        <Field name="percentage1">
          {{
            label: "Percentage",
            editor: "percentage"
          }}
        </Field>
        <Field name="percentage2">
          {{
            label: "Percentage, no fraction digits",
            editor: "percentage",
            maximumFractionDigits: 0
          }}
        </Field>
        <Field name="percentage3">
          {{
            label: "Percentage, custom symbol",
            editor: "percentage",
            symbol: "Ownership %"
          }}
        </Field>
        <Field name="phone1">
          {{
            label: "US Phone",
            editor: "phone",
            defaultCountry: "US"
          }}
        </Field>
        <Field name="phone2">
          {{
            label: "UK Phone",
            editor: "phone",
            defaultCountry: "GB"
          }}
        </Field>
        <Field name="zipCode1">
          {{
            label: "Zip Code",
            editor: "zipCode"
          }}
        </Field>
        <Field name="reset1">
          {{
            label: "Reset",
            editor: "reset"
          }}
        </Field>
        <Field name="submit1">
          {{
            label: "Submit",
            editor: "submit"
          }}
        </Field>
      </Fields>
    </FormView>
    <StateInspector />
  </Store>
);
```
