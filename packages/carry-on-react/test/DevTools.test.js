/** @format **/
import React from "react";
import { initStores } from "carry-on-store";
import { render } from "react-testing-library";
import carryOn from "../src/carryOn";
import DevTools from "../src/DevTools";

afterEach(() => {
  initStores();
});

test("DevTools renders", () => {
  const App = () => (
    <DevTools>
      <div>ok</div>
    </DevTools>
  );

  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

test("Multiple DevTools renders", () => {
  const App = () => (
    <DevTools>
      <DevTools>
        <DevTools>
          <DevTools />
          <div>ok</div>
        </DevTools>
      </DevTools>
    </DevTools>
  );

  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
