/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import { set, getStore, deleteStore, register } from "carry-on-store";
import { withState, State } from "../src";

test("<State /> renders", () => {
  const { asFragment } = render(<State>{() => "ok"}</State>);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

test("withState renders", () => {
  const Comp = withState()(props => "ok");
  const { asFragment } = render(<Comp />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

test("withState selection function returns non Object as state prop", () => {
  const select = state => "ok";
  const Comp = withState({ select })(props => JSON.stringify(props));
  const { asFragment } = render(<Comp prop1="ok" />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

test("withState selection function returns array as state prop", () => {
  const select = (state, props) => [1, 2, 3];
  const Comp = withState({ select })(props => JSON.stringify(props));
  const { asFragment } = render(<Comp prop1="ok" />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

test("withState path, from, and default can be a values", () => {
  const select = (state, props) => state;
  const from = undefined;
  const path = "key1";
  const def = "default Value";

  register({
    state: ({ set }) => ({
      key1: "val1",
      key2: "val2"
    })
  });

  const Comp = withState({ select, from, path, def })(props =>
    JSON.stringify(props)
  );

  const App = props => <Comp lookup="key1" />;

  const { asFragment } = render(<App />);

  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

test("withState asProp", () => {
  const Comp = withState({ asProp: "stuff" })(props => JSON.stringify(props));
  const { asFragment } = render(<Comp prop1="ok" />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

test("withState debug/verbose", () => {
  const Comp = withState({ debug: true, verbose: true })(props => "ok");
  const { asFragment } = render(<Comp />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

test("withState debounce", async () => {
  set(state => { state.field = "value1"; });
  const Comp = withState({ debounce: 1 })(props => props.field || null);
  const { asFragment } = render(<Comp />);
  expect(asFragment()).toMatchSnapshot();
  set(state => { state.field = "value2"; });
  await new Promise((r) => setTimeout(r, 5));
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

test("withState throttle", async () => {
  set(state => { state.field = "value1"; });
  const Comp = withState({ throttle: 1 })(props => props.field || null);
  const { asFragment } = render(<Comp />);
  expect(asFragment()).toMatchSnapshot();
  set(state => { state.field = "value2"; });
  await new Promise((r) => setTimeout(r, 5));
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

test("withState constant", () => {
  set(state => { state.field = "value1"; });
  const Comp = withState({ constant: true, debug: true, verbose: true })(props => props.field || null);
  const { asFragment } = render(<Comp />);
  expect(asFragment()).toMatchSnapshot();
  set(state => { state.field = "value2"; });
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});
