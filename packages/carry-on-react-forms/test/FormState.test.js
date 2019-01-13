import React from "react";
import { render } from "react-testing-library";
import Form from "../src/Form";
import Field from "../src/Field";
import FormButtons from "../src/FormButtons";
import FormState from "../src/FormState";

it("should render <FormState>", () => {
  expect(render(<FormState />).asFragment()).toMatchSnapshot();
});
