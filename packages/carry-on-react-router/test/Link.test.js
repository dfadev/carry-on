import React from "react";
import ReactDOM from "react-dom";
import { initStores } from "carry-on-store";
import { createMemoryHistory } from "history";
import Link from "../src/components/Link";
import { Router, HashRouter } from "../src/components/Router";
import { render } from "@testing-library/react";

beforeEach(() => {
  window.location.replace("/");
  initStores();
});

describe("A <Link>", () => {
  const node = document.createElement("div");

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it("throws with no Router", () => {
    const orig = console.error;
    console.error = () => {};
    expect(() => render(<Link />)).toThrow();
    console.error = orig;
  });

  it("renders with no props", () => {
    const { asFragment } = render(
      <Router>
        <Link>link</Link>
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("accepts a string `to` prop", () => {
    const to = "/the/path?the=query#the-hash";
    const { asFragment } = render(
      <Router>
        <Link to={to}>link</Link>
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("accepts an object `to` prop", () => {
    const to = {
      pathname: "/the/path",
      search: "the=query",
      hash: "#the-hash"
    };

    const { asFragment } = render(
      <Router>
        <Link to={to}>link</Link>
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("with no pathname, resolves using the current location", () => {
    const { asFragment } = render(
      <Router history={createMemoryHistory({ initialEntries: ["/somewhere"] })}>
        <Link to={"?rendersWithPathname=true"}>link</Link>
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("exposes its ref via an innerRef prop", done => {
    function refCallback(n) {
      if (n) {
        expect(n.tagName).toEqual("A");
        done();
      }
    }

    const { asFragment } = render(
      <Router>
        <Link to="/" innerRef={refCallback}>
          link
        </Link>
      </Router>
    );
  });

  describe("with a <HashRouter>", () => {
    function createLinkNode(hashType, to) {
      const { asFragment } = render(
        <HashRouter hashType={hashType}>
          <Link to={to} />
        </HashRouter>
      );

      return asFragment;
    }

    describe('with the "slash" hashType', () => {
      it("has the correct href", () => {
        const linkNode = createLinkNode("slash", "/foo");
        expect(linkNode()).toMatchSnapshot();
      });

      it("has the correct href with a leading slash if it is missing", () => {
        const linkNode = createLinkNode("slash", "foo");
        expect(linkNode()).toMatchSnapshot();
      });
    });

    describe('with the "hashbang" hashType', () => {
      it("has the correct href", () => {
        const linkNode = createLinkNode("hashbang", "/foo");
        expect(linkNode()).toMatchSnapshot();
      });

      it("has the correct href with a leading slash if it is missing", () => {
        const linkNode = createLinkNode("hashbang", "foo");
        expect(linkNode()).toMatchSnapshot();
      });
    });

    describe('with the "noslash" hashType', () => {
      it("has the correct href", () => {
        const linkNode = createLinkNode("noslash", "foo");
        expect(linkNode()).toMatchSnapshot();
      });

      it("has the correct href and removes the leading slash", () => {
        const linkNode = createLinkNode("noslash", "/foo");
        expect(linkNode()).toMatchSnapshot();
      });
    });
  });
});
