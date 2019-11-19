import React from "react";
import { initStores } from "carry-on-store";

import {
  Router,
  BrowserRouter,
  MemoryRouter,
  HashRouter,
  StaticRouter
} from "../src/components/Router";
import { render } from "@testing-library/react";

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

describe("A <Router>", () => {
  afterEach(() => {
    initStores();
  });

  describe("with no children", () => {
    it("does not throw an error", () => {
      expect(() => {
        render(<Router />);
      }).not.toThrow();
    });
  });

  describe("with one child", () => {
    it("does not throw an error", () => {
      expect(() => {
        render(
          <Router>
            <p>Bar</p>
          </Router>
        );
      }).not.toThrow();
    });
  });

  describe("with more than one child", () => {
    it("does not throw an error", () => {
      expect(() => {
        render(
          <Router>
            <p>Bubblegum</p>
            <p>Cupcakes</p>
          </Router>
        );
      }).not.toThrow();
    });
  });
});
