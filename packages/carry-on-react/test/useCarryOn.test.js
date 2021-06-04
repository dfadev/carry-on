/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import { set, getStore, deleteStore, register } from "carry-on-store";
import { withState, State, useCarryOn } from "../src";

const FnComp = () => {
  const stuff = useCarryOn({
    debug: true,
    verbose: true,
    register: {
      state: {
        item1: "value1"
      }
    },
    select: state => state.item1
  });

  return stuff;
};

test("useCarryOn renders", () => {
  const { asFragment } = render(<FnComp />);
  expect(asFragment()).toMatchSnapshot();
  set(state => {
    state.item1 = "value2";
  });
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

const FnComp2 = () => {
  const stuff = useCarryOn({
    throttle: 1000,
    debug: true,
    verbose: true,
    register: {
      state: {
        item1: "value1"
      }
    },
    select: state => state.item1
  });

  return stuff;
};

test("useCarryOn throttle", () => {
  const { asFragment } = render(<FnComp2 />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

const FnComp3 = () => {
  const stuff = useCarryOn({
    debounce: 1000,
    debug: true,
    verbose: true,
    constant: true,
    select: state => state.item1
  });

  return "ok";
};

test("useCarryOn debounce", () => {
  const { asFragment } = render(<FnComp3 />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});
