/** @format **/
import React from "react";
import { render } from "react-testing-library";
import { withStore, Store, State, deleteStore } from "../src";

test("<Store /> renders", () => {
  const { asFragment } = render(<Store>ok</Store>);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

test("withStore renders", () => {
  const Comp = withStore()(props => "ok");
  const { asFragment } = render(<Comp />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

test("withStore init function takes props", () => {
  const Comp = withStore({ init: props => ({ [props.abc]: "val" }) })(props => (
    <State>{state => JSON.stringify(state)}</State>
  ));
  const { asFragment } = render(<Comp abc="thing" />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});
