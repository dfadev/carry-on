/**
 * @jest-environment jsdom
 */
import React from "react";
import { set, initStores } from "carry-on-store";
import { render } from "@testing-library/react";
import carryOn from "../src/carryOn";

afterEach(() => {
  initStores();
});

test("carryOn", () => {
  let onMountCalled = 0;
  const App = carryOn(
    {
      id: "App",
      register: {
        state: {
          field: "value"
        }
      },
      onMount: () => {
        onMountCalled += 1;
      }
    },
    state => <div>{state.field}</div>
  );

  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
  set(state => {
    state.field = "new value";
  });
  expect(asFragment()).toMatchSnapshot();

  expect(onMountCalled).toBe(1);
});

test("carryOn alt", () => {
  let onMountCalled = 0;
  let onUnmountCalled = 0;
  const App = carryOn(
    (props, state) => (
      <div>
        {props.id} {state.field}
      </div>
    ),
    {
      register: {
        state: {
          field: "value"
        }
      }
    }
  );

  const { asFragment } = render(
    <App
      from="named"
      debug
      verbose
      id="thing"
      onUnmount={() => {
        onUnmountCalled += 1;
      }}
      onMount={() => {
        onMountCalled += 1;
      }}
    />
  );
  expect(asFragment()).toMatchSnapshot();
  set("named", state => {
    state.field = "new value";
  });
  expect(asFragment()).toMatchSnapshot();

  expect(onMountCalled).toBe(1);
});
