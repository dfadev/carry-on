/**
 * @jest-environment jsdom
 */
import React from "react";
import { register, initStores } from "carry-on-store";
import { Store, State, Register } from "carry-on-react";
import { render } from "@testing-library/react";
import FormView from "../src/FormView";
import {
  InitialValues,
  Sections,
  Section,
  Fields,
  Field
} from "../src/Composables";

describe("FormView", () => {
  beforeEach(() => initStores());

  it("<FormView /> renders", () => {
    const { asFragment } = render(<FormView />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders example 1", () => {
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
        SectionBox: ({ section: { title }, children }) => (
          <div
            style={{
              border: "1px solid blue",
              margin: "16px",
              padding: "16px"
            }}
          >
            <h2>SectionBox: {title}</h2>
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
            style={{
              border: "1px solid white",
              margin: "16px",
              padding: "16px"
            }}
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

    const { asFragment } = render(
      <Store id="formViewStore">
        <FormView {...view} />
      </Store>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders example 2", () => {
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
              style={{
                border: "1px solid blue",
                margin: "16px",
                padding: "16px"
              }}
            >
              <h2>SectionBox</h2>
              {children}
            </div>
          ),
          View: ({ children }) => (
            <div
              style={{
                border: "1px solid red",
                margin: "16px",
                padding: "16px"
              }}
            >
              <div>
                <h2>View</h2>
              </div>
              <div style={{ display: "flex" }}>{children}</div>
            </div>
          ),
          ViewItem: ({ children }) => (
            <div
              style={{
                border: "1px solid white",
                margin: "16px",
                padding: "16px"
              }}
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

    const { asFragment } = render(
      <Store id="formViewStore2">
        <FormView {...view} />
      </Store>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders example 3", () => {
    const components = {
      components: {
        FormViewBox: ({ children }) => (
          <div style={{ border: "1px solid purple", padding: "16px" }}>
            <h2>FormViewBox</h2>
            {children}
          </div>
        ),
        SectionBox: ({ section: { title }, children }) => (
          <div
            style={{
              border: "1px solid blue",
              margin: "16px",
              padding: "16px"
            }}
          >
            <h2>SectionBox: {title}</h2>
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
            style={{
              border: "1px solid white",
              margin: "16px",
              padding: "16px"
            }}
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

    const { asFragment } = render(
      <Store id="formViewStoreComposing">
        <State>
          <Register>{components}</Register>
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
      </Store>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
