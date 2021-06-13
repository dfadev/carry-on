---
id: FormView
title: <FormView>
---

Render a view described by JSON.

```js live noInline
const view = {
  id: "formView1",
  initialValues: {
    abc: "123",
    def: "345",
    ghi: undefined,
    jkl: null
  },
  sections: [
    {
      title: "Section 1",
      layout: ["abc", "def"]
    },
    {
      title: "Section 2",
      layout: [["ghi"], ["jkl"]]
    }
  ],
  fields: {
    abc: {
      label: "ABC",
      tooltip: () => <div>ABC tooltip</div>
    }
  },
  components: {
    FormViewBox: ({ children }) => (
      <div style={{ border: "1px solid purple", padding: "16px" }}>
        <h2>FormViewBox</h2>
        {children}
      </div>
    ),
    SectionBox: ({ title, children }) => (
      <div
        style={{ border: "1px solid blue", margin: "16px", padding: "16px" }}
      >
        <h2>SectionBox: {title}</h2>
        {children}
      </div>
    ),
    View: ({ children }) => (
      <div style={{ border: "1px solid red", margin: "16px", padding: "16px" }}>
        <div>
          <h2>View</h2>
        </div>
        <div style={{ display: "flex" }}>{children}</div>
      </div>
    ),
    ViewItem: ({ children }) => (
      <div
        style={{ border: "1px solid white", margin: "16px", padding: "16px" }}
      >
        <div>
          <h2>ViewItem</h2>
        </div>
        <div style={{ display: "block" }} margin="16px" padding="16px">
          {children}
        </div>
      </div>
    ),
    editors: {}
  }
};

render(
  <Store id="formViewStore">
    <FormView {...view} />
    <StateInspector />
  </Store>
);
```

Register default components:

```js live noInline
register("formViewStore2", {
  state: {
    components: {
      FormViewBox: ({ children }) => (
        <div style={{ border: "1px solid purple", padding: "16px" }}>
          <h2>FormViewBox</h2>
          {children}
        </div>
      ),
      SectionBox: ({ children }) => (
        <div
          style={{ border: "1px solid blue", margin: "16px", padding: "16px" }}
        >
          <h2>SectionBox</h2>
          {children}
        </div>
      ),
      View: ({ children }) => (
        <div
          style={{ border: "1px solid red", margin: "16px", padding: "16px" }}
        >
          <div>
            <h2>View</h2>
          </div>
          <div style={{ display: "flex" }}>{children}</div>
        </div>
      ),
      ViewItem: ({ children }) => (
        <div
          style={{ border: "1px solid white", margin: "16px", padding: "16px" }}
        >
          <div>
            <h2>ViewItem</h2>
          </div>
          <div style={{ display: "block" }} margin="16px" padding="16px">
            {children}
          </div>
        </div>
      ),
      editors: {}
    }
  }
});

const view = {
  id: "formView2",
  initialValues: {
    abc: "123",
    def: "345",
    ghi: undefined,
    jkl: null
  },
  sections: [
    {
      title: "Section 1",
      layout: [["abc", "def"]]
    },
    {
      title: "Section 2",
      layout: [["ghi"], ["jkl"]]
    }
  ],
  fields: {
    abc: {
      label: "ABC"
    }
  }
};

render(
  <Store id="formViewStore2">
    <FormView {...view} />
    <StateInspector />
  </Store>
);
```

Composing

```js live noInline
const components = {
  components: {
    FormViewBox: ({ children }) => (
      <div style={{ border: "1px solid purple", padding: "16px" }}>
        <h2>FormViewBox</h2>
        {children}
      </div>
    ),
    SectionBox: ({ title, children }) => (
      <div
        style={{ border: "1px solid blue", margin: "16px", padding: "16px" }}
      >
        <h2>SectionBox: {title}</h2>
        {children}
      </div>
    ),
    View: ({ children }) => (
      <div style={{ border: "1px solid red", margin: "16px", padding: "16px" }}>
        <div>
          <h2>View</h2>
        </div>
        <div style={{ display: "flex" }}>{children}</div>
      </div>
    ),
    ViewItem: ({ children }) => (
      <div
        style={{ border: "1px solid white", margin: "16px", padding: "16px" }}
      >
        <div>
          <h2>ViewItem</h2>
        </div>
        <div style={{ display: "block" }} margin="16px" padding="16px">
          {children}
        </div>
      </div>
    ),
    editors: {}
  }
};

render(
  <Store id="formViewStoreComposing">
    <State>
      <Register>{{ state: components }}</Register>
    </State>
    <FormView id="formViewComposing">
      <InitialValues>
        {{
          abc: "abc"
        }}
      </InitialValues>
      <Sections>
        <Section title="Section 1">{["abc", "def"]}</Section>
        <Section title="Section 2">{[["ghi"], ["jkl"]]}</Section>
      </Sections>
      <Fields>
        <Field name="abc">
          {{
            label: "ABC",
            tooltip: "The ABC Tooltip"
          }}
        </Field>
      </Fields>
    </FormView>
    <StateInspector />
  </Store>
);
```
