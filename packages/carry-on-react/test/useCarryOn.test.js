import React from "react";
import { render } from "@testing-library/react";
import { withState, State, useCarryOn } from "../src";
import { getStore, deleteStore, register } from "carry-on-store";

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

  return "ok";
};

test("useCarryOn renders", () => {
  //register({ state: { item1: "value1" } });
  const { asFragment } = render(<FnComp />);
  expect(asFragment()).toMatchSnapshot();
  deleteStore();
});

