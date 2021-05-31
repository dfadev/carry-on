/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import Form from "../src/Form";
import Field from "../src/Field";
import FormButtons from "../src/FormButtons";

it("should render <FormButtons>", () => {
  expect(render(<FormButtons />).asFragment()).toMatchSnapshot();
});
