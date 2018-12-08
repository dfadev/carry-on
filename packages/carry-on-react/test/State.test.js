import React from "react";
import { render } from "react-testing-library";
import { withState, State, Store, deleteStore } from "../src";

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

test("withState selection function takes props", () => {
  const select = (state, props) => ({ thing: props.prop1 });
  const Comp = withState({ select })(props => JSON.stringify(props));
  const { asFragment } = render(<Comp prop1="ok" />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

test("withState selection function returns non Object as state prop", () => {
  const select = (state, props) => props.prop1;
  const Comp = withState({ select })(props => JSON.stringify(props));
  const { asFragment } = render(<Comp prop1="ok" />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

test("withState selection function returns array as state prop", () => {
  const select = (state, props) => [1,2,3];
  const Comp = withState({ select })(props => JSON.stringify(props));
  const { asFragment } = render(<Comp prop1="ok" />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

test("withState select, path, from, and default can be a function", () => {
  const select = (state, props) => state;
  const from = (props) => undefined;
  const path = (props) => props.lookup;
  const def = (props) => "default Value";

  const store = dispatch => ({
    key1: "val1",
    key2: "val2"
  });

  const Comp = withState({ select, from, path, def })(props => JSON.stringify(props));

  const App = props => (
    <Store init={store}>
      <Comp lookup="key1" />
    </Store>
  );

  const { asFragment } = render(<App />);

  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

test("withState path, from, and default can be a values", () => {
  const select = (state, props) => state;
  const from = undefined;
  const path = "key1";
  const def = "default Value";

  const store = dispatch => ({
    key1: "val1",
    key2: "val2"
  });

  const Comp = withState({ select, from, path, def })(props => JSON.stringify(props));

  const App = props => (
    <Store init={store}>
      <Comp lookup="key1" />
    </Store>
  );

  const { asFragment } = render(<App />);

  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});