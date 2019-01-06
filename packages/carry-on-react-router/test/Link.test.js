import React from "react";
import ReactDOM from "react-dom";
//import { MemoryRouter, HashRouter, Link } from "react-router-dom";
import { register, initStores } from "carry-on-store";
import { createMemoryHistory, createHashHistory } from "history";
import Link from "../src/components/Link";
import router from "../src/router";
import renderStrict from "./utils/renderStrict";
import { render } from "react-testing-library";

beforeEach(() => {
  initStores();
});

describe("A <Link>", () => {
  const node = document.createElement("div");

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  //describe("with no <Router>", () => {
  //it("throws an error", () => {
  //jest.spyOn(console, "error").mockImplementation(() => {});

  //expect(() => {
  //renderStrict(<Link to="/">link</Link>, node);
  //}).toThrow(/You should not use <Link> outside a <Router>/);

  //expect(console.error).toHaveBeenCalledTimes(2);
  //});
  //});

  //describe("with no `to` prop", () => {
  it("renders with no props", () => {
    register(router());
    const { asFragment } = render(<Link>link</Link>);
    expect(asFragment()).toMatchSnapshot();
  });

  //it("logs an error to the console", () => {
  //jest.spyOn(console, "error").mockImplementation(() => {});

  //register(router(createMemoryHistory()));
  //renderStrict(<Link>link</Link>, node);

  //expect(console.error).toHaveBeenCalledWith(
  //expect.stringContaining("The prop `to` is marked as required in `Link`")
  //);
  //});
  //});

  it("accepts a string `to` prop", () => {
    const to = "/the/path?the=query#the-hash";
    register(router());
    const { asFragment } = render(<Link to={to}>link</Link>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("accepts an object `to` prop", () => {
    const to = {
      pathname: "/the/path",
      search: "the=query",
      hash: "#the-hash"
    };

    register(router());
    const { asFragment } = render(<Link to={to}>link</Link>);
    expect(asFragment()).toMatchSnapshot();
  });

  //describe("with no pathname", () => {
  it("with no pathname, resolves using the current location", () => {
    register(router(createMemoryHistory({ initialEntries: ["/somewhere"] })));
    const { asFragment } = render(
      <Link to={"?rendersWithPathname=true"}>link</Link>
    );
    expect(asFragment()).toMatchSnapshot();

    //renderStrict(
    //<MemoryRouter initialEntries={["/somewhere"]}>
    //<Link to="?rendersWithPathname=true">link</Link>
    //</MemoryRouter>,
    //node
    //);

    //const a = node.querySelector("a");

    //expect(a.getAttribute("href")).toEqual(
    //"/somewhere?rendersWithPathname=true"
    //);
  });
  //});

  it("exposes its ref via an innerRef prop", done => {
    function refCallback(n) {
      if (n) {
        expect(n.tagName).toEqual("A");
        done();
      }
    }

    register(router());
    const { asFragment } = render(
      <Link to="/" innerRef={refCallback}>
        link
      </Link>
    );
  });

  //describe("with a <HashRouter>", () => {
    //afterEach(() => {
      //window.history.replaceState(null, "", "#");
      //register(router(createHashHistory()));
    //});

    //function createLinkNode(hashType, to) {
      //renderStrict(
        //<HashRouter hashType={hashType}>
          //<Link to={to} />
        //</HashRouter>,
        //node
      //);

      //return node.querySelector("a");
    //}

    //describe('with the "slash" hashType', () => {
      //it("has the correct href", () => {
        //const linkNode = createLinkNode("slash", "/foo");
        //expect(linkNode.getAttribute("href")).toEqual("#/foo");
      //});

      //it("has the correct href with a leading slash if it is missing", () => {
        //const linkNode = createLinkNode("slash", "foo");
        //expect(linkNode.getAttribute("href")).toEqual("#/foo");
      //});
    //});

    //describe('with the "hashbang" hashType', () => {
      //it("has the correct href", () => {
        //const linkNode = createLinkNode("hashbang", "/foo");
        //expect(linkNode.getAttribute("href")).toEqual("#!/foo");
      //});

      //it("has the correct href with a leading slash if it is missing", () => {
        //const linkNode = createLinkNode("hashbang", "foo");
        //expect(linkNode.getAttribute("href")).toEqual("#!/foo");
      //});
    //});

    //describe('with the "noslash" hashType', () => {
      //it("has the correct href", () => {
        //const linkNode = createLinkNode("noslash", "foo");
        //expect(linkNode.getAttribute("href")).toEqual("#foo");
      //});

      //it("has the correct href and removes the leading slash", () => {
        //const linkNode = createLinkNode("noslash", "/foo");
        //expect(linkNode.getAttribute("href")).toEqual("#foo");
      //});
    //});
  //});
});
