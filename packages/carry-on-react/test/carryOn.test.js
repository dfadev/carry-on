/**
 * @jest-environment jsdom
 */
import React from "react";
import { initStores } from "carry-on-store";
import { render } from "@testing-library/react";
import carryOn from "../src/carryOn";

afterEach(() => {
  initStores();
});

test("carryOn", () => {
  const App = carryOn(
    {
      id: "App",
      register: {
        state: {
          field: "value"
        }
      }
    },
    state => <div>{state.field}</div>
  );

  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

test("carryOn opts last", () => {
  const App = carryOn(state => <div>{state.field}</div>, {
    id: "App",
    register: {
      state: {
        field: "value"
      }
    }
  });

  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

test("carryOn rerender doesnt recreate onmount/onunmount", () => {
  const App = carryOn(state => <div>{state.field}</div>, {
    register: {
      state: {
        field: "value"
      }
    },
    onMount: state => {},
    onUnmount: state => {}
  });

  const { asFragment, rerender } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
  rerender();
});

test("carryOn rerender doesnt recreate onmount/onunmount 2", () => {
  const App = carryOn(state => <div>{state.field}</div>, {
    register: {
      state: {
        field: "value"
      }
    },
    onMount: (state, props) => {},
    onUnmount: (state, props) => {}
  });

  const { asFragment, rerender } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
  rerender();
});

test("carryOn render(props, state)", () => {
  const App = carryOn((props, state) => <div>ok</div>);
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
