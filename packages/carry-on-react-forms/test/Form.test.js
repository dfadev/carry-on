/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import Form from "../src/Form";

it("should render <Form>", () => {
  expect(render(<Form />).asFragment()).toMatchSnapshot();
});
