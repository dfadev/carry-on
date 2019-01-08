import React from "react";
//import ReactDOM from "react-dom";
import {
  Router,
  BrowserRouter,
  MemoryRouter,
  HashRouter,
  StaticRouter
} from "../src/components/Router";
import { render } from "react-testing-library";

import renderStrict from "./utils/renderStrict";

it("Router renders", () => {
  const { asFragment } = render(<Router history={history} />);
  expect(asFragment()).toMatchSnapshot();
});

it("BrowserRouter renders", () => {
  const { asFragment } = render(<BrowserRouter history={history} />);
  expect(asFragment()).toMatchSnapshot();
});

it("MemoryRouter renders", () => {
  const { asFragment } = render(<MemoryRouter history={history} />);
  expect(asFragment()).toMatchSnapshot();
});

it("HashRouter renders", () => {
  const { asFragment } = render(<HashRouter history={history} />);
  expect(asFragment()).toMatchSnapshot();
});

it("StaticRouter renders", () => {
  const { asFragment } = render(<StaticRouter history={history} />);
  expect(asFragment()).toMatchSnapshot();
});

