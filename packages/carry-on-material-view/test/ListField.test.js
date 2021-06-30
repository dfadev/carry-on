/**
 * @jest-environment jsdom
 */
import React from "react";
import { initStores } from "carry-on-store";
import { render } from "@testing-library/react";
import { Paper, Box } from "@material-ui/core";
import { Store, Register } from "carry-on-react";
import { Form } from "carry-on-react-forms";
import {
  FormView,
  Fields,
  Field,
  Sections,
  Section,
  InitialValues,
  FormViewer
} from "carry-on-react-view";
import { materialViewComponents } from "../src/registerComponents";
import TextField from "../src/TextField";
import PhoneField from "../src/PhoneField";
import DataField from "../src/DataField";
import ListField from "../src/ListField";

beforeEach(() => {
  initStores();
});

it("should render <ListField> inside a Form", () => {
  expect(
    render(
      <Store id={"listFieldForm"}>
        <Form>
          <InitialValues>
            {{
              contacts: [
                {
                  name: "John Johnson",
                  phone: "+44 7911 123456",
                  email: "jj@co.uk"
                },
                { name: "Jan Jansen", phone: "7025551212", email: "jj@lv.nv" }
              ]
            }}
          </InitialValues>
          <Paper>
            <Box px={3} pt={2} pb={3} mb={2}>
              <ListField name="contacts" label="Contact Editor">
                <Box my={1} p={1} pt={0}>
                  <Box>
                    Sample Greeting:
                    <h4>
                      Hello <DataField name="name" />!
                    </h4>
                  </Box>
                  <TextField name="name" label="Name" />
                  <PhoneField name="phone" label="Phone" defaultCountry="US" />
                  <TextField name="email" label="Email" />
                </Box>
              </ListField>
            </Box>
          </Paper>
        </Form>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});

it("should render <ListField> inside a FormView", () => {
  expect(
    render(
      <Store id={"listFieldFormView"}>
        <FormView>
          <Register>{materialViewComponents}</Register>
          <InitialValues>
            {{
              contacts: [
                {
                  name: "John Johnson",
                  phone: "+44 7911 123456",
                  email: "jj@co.uk"
                },
                { name: "Jan Jansen", phone: "7025551212", email: "jj@lv.nv" }
              ]
            }}
          </InitialValues>
          <Fields>
            <Field
              name="contacts"
              label="Contact Editor"
              editor="list"
              renderItem={
                <FormViewer
                  fields={{
                    greeting: {
                      editor: "content",
                      content: (
                        <Box>
                          Sample Greeting:
                          <h4>
                            Hello <DataField name="name" />!
                          </h4>
                        </Box>
                      )
                    },
                    name: { label: "Name" },
                    phone: {
                      label: "Mobile",
                      editor: "phone",
                      defaultCountry: "US"
                    },
                    email: { label: "Email" }
                  }}
                  sections={[
                    {
                      layout: [["greeting"], ["name", "email", "phone"]]
                    }
                  ]}
                />
              }
            />
          </Fields>
          <Sections>
            <Section>{["contacts"]}</Section>
          </Sections>
        </FormView>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});
