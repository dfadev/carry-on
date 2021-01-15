import React from "react";
import { render } from "@testing-library/react";
import { withState, State } from "../src";
import { getStore, deleteStore, register } from "carry-on-store";

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
