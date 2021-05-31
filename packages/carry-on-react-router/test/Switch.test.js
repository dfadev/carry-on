/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import { initStores } from "carry-on-store";
import { MemoryRouter } from "../src/components/Router";
import Route from "../src/components/Route";
import Redirect from "../src/components/Redirect";
import Switch from "../src/components/Switch";

describe("A <Switch>", () => {
  afterEach(() => {
    initStores();
  });

  describe("without a <Router>", () => {
    it("throws an error", () => {
      jest.spyOn(console, "error").mockImplementation(() => {});

      expect(() => {
        render(<Switch />);
      }).toThrow();
    });
  });

  it("renders the first <Route> that matches the URL", () => {
    expect(
      render(
        <MemoryRouter initialEntries={["/one"]}>
          <Switch>
            <Route path="/one" render={() => <h1>one</h1>} />
            <Route path="/two" render={() => <h1>two</h1>} />
          </Switch>
        </MemoryRouter>
      ).asFragment()
    ).toMatchSnapshot();
  });

  it("does not render a second <Route> that also matches the URL", () => {
    expect(
      render(
        <MemoryRouter initialEntries={["/one"]}>
          <Switch>
            <Route path="/one" render={() => <h1>one</h1>} />
            <Route path="/one" render={() => <h1>two</h1>} />
          </Switch>
        </MemoryRouter>
      ).asFragment()
    ).toMatchSnapshot();
  });

  it("renders the first <Redirect> that matches the URL", () => {
    expect(
      render(
        <MemoryRouter initialEntries={["/three"]}>
          <Switch>
            <Route path="/one" render={() => <h1>one</h1>} />
            <Route path="/two" render={() => <h1>two</h1>} />
            <Redirect path="/three" to="/two" />
          </Switch>
        </MemoryRouter>
      ).asFragment()
    ).toMatchSnapshot();
  });

  it("does not render a second <Redirect> that also matches the URL", () => {
    expect(
      render(
        <MemoryRouter initialEntries={["/three"]}>
          <Switch>
            <Route path="/one" render={() => <h1>one</h1>} />
            <Route path="/two" render={() => <h1>two</h1>} />
            <Redirect path="/three" to="/two" />
            <Redirect path="/three" to="/one" />
          </Switch>
        </MemoryRouter>
      ).asFragment()
    ).toMatchSnapshot();
  });

  it("renders a Route with no `path` prop", () => {
    expect(
      render(
        <MemoryRouter initialEntries={["/two"]}>
          <Switch>
            <Route path="/one" render={() => <h1>one</h1>} />
            <Route render={() => <h1>two</h1>} />
          </Switch>
        </MemoryRouter>
      ).asFragment()
    ).toMatchSnapshot();
  });

  it("renders a Redirect with no `path` prop", () => {
    expect(
      render(
        <MemoryRouter initialEntries={["/three"]}>
          <Switch>
            <Route path="/one" render={() => <h1>one</h1>} />
            <Redirect to="/one" />
            <Route path="/two" render={() => <h1>two</h1>} />
          </Switch>
        </MemoryRouter>
      ).asFragment()
    ).toMatchSnapshot();
  });

  // it("handles subsequent redirects", () => {
  // const App = (
  // <MemoryRouter initialEntries={["/one"]}>
  // <Switch>
  // <Redirect path="/one" to="/two" />
  // <Redirect path="/two" to="/three" />
  // <Route path="/three" render={() => <h1>three</h1>} />
  // </Switch>
  // </MemoryRouter>
  // );

  // const { asFragment, rerender } = render(App);

  // expect(asFragment()).toMatchSnapshot();
  // rerender(App);
  // expect(asFragment()).toMatchSnapshot();
  // rerender(App);
  // expect(asFragment()).toMatchSnapshot();

  /// /waitForRedirects(() => {
  /// /expect(node.innerHTML).toContain("three");
  /// /done();
  /// /});
  // });

  it("handles comments", () => {
    expect(
      render(
        <MemoryRouter initialEntries={["/cupcakes"]}>
          <Switch>
            <Route path="/bubblegum" render={() => <div>bub</div>} />
            {/* this is a comment */}
            <Route path="/cupcakes" render={() => <div>cup</div>} />
          </Switch>
        </MemoryRouter>
      ).asFragment()
    ).toMatchSnapshot();
  });

  it("renders with non-element children", () => {
    expect(
      render(
        <MemoryRouter initialEntries={["/one"]}>
          <Switch>
            <Route path="/one" render={() => <h1>one</h1>} />
            {false}
            {undefined}
          </Switch>
        </MemoryRouter>
      ).asFragment()
    ).toMatchSnapshot();
  });

  it("can use a `location` prop instead of `router.location`", () => {
    expect(
      render(
        <MemoryRouter initialEntries={["/one"]}>
          <Switch location={{ pathname: "/two" }}>
            <Route path="/one" render={() => <h1>one</h1>} />
            <Route path="/two" render={() => <h1>two</h1>} />
          </Switch>
        </MemoryRouter>
      ).asFragment()
    ).toMatchSnapshot();
  });
});
