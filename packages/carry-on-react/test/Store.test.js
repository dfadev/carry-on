/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import { Store } from "../src";

test("Store renders", () => {
  const { asFragment } = render(<Store />);
  expect(asFragment()).toMatchSnapshot();
});
