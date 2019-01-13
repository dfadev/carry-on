import React from "react";
import { render } from "react-testing-library";
import Form from "../src/Form";

it("should render <Form>", () => {
  expect(render(<Form />).asFragment()).toMatchSnapshot();
});
