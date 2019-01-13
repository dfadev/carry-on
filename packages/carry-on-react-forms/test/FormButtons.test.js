import React from "react";
import { render } from "react-testing-library";
import Form from "../src/Form";
import Field from "../src/Field";
import FormButtons from "../src/FormButtons";

it("should render <FormButtons>", () => {
  expect(render(<FormButtons />).asFragment()).toMatchSnapshot();
});
