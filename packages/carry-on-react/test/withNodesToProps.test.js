/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import withNodesToProps from "../src/withNodesToProps";

test("withNodesToProps", () => {
  const Inner = () => null;
  Inner.prop = "inner";
  const PropVal = Object.assign(() => null, {
    prop: "val",
    val: "val",
    default: 0
  });
  const Default = () => null;
  Object.assign(Default, { prop: "default", default: true, transform: s => s });

  const InnerElement = ({ inner, val, default: def }) => (
    <div>
      {Array.isArray(inner) ? inner.join(", ") : inner} {val}{" "}
      {def ? "true" : "false"}
    </div>
  );
  InnerElement.composes = ["inner", "val", "default"];

  const Element = withNodesToProps(InnerElement);

  const { asFragment } = render(
    <Element>
      <Inner>stuff</Inner>
      <PropVal val="123" />
      <Default />
    </Element>
  );
  expect(asFragment()).toMatchSnapshot();

  const { asFragment: asFragment2 } = render(
    <Element>
      <Inner>stuff</Inner>
      <Inner>stuff</Inner>
      <Inner>stuff</Inner>
      <PropVal val="123" />
      <PropVal val="123" />
      <PropVal val="123" />
      <Default />
    </Element>
  );
  expect(asFragment2()).toMatchSnapshot();
});
