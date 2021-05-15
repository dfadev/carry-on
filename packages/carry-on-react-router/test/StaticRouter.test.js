import React from "react";
import { render } from "@testing-library/react";
import { initStores, connect, get } from "carry-on-store";
import Route from "../src/components/Route";
import Prompt from "../src/components/Prompt";
import Redirect from "../src/components/Redirect";
import { StaticRouter } from "../src/components/Router";

describe("A <StaticRouter>", () => {
  afterEach(() => {
    initStores();
  });

  //describe("with a history prop", () => {
  //it("logs a warning", () => {
  //jest.spyOn(console, "warn").mockImplementation(() => {});

  //const history = {};
  //renderStrict(<StaticRouter history={history} />, node);

  //expect(console.warn).toHaveBeenCalledWith(
  //expect.stringContaining("<StaticRouter> ignores the history prop")
  //);
  //});
  //});

  it("reports redirects on the context object", () => {
    const context = {};

    expect(
      render(
        <StaticRouter context={context}>
          <Redirect to="/somewhere-else" />
        </StaticRouter>
      ).asFragment()
    ).toMatchSnapshot();

    expect(get().app.history.staticContext).toMatchSnapshot();
  });

  it("reports push redirects on the context object", () => {
    const context = {};

    expect(
      render(
        <StaticRouter context={context}>
          <Redirect to="/somewhere-else" push />
        </StaticRouter>
      ).asFragment()
    ).toMatchSnapshot();

    expect(get().app.history.staticContext).toMatchSnapshot();
  });

  describe("with a string location prop", () => {
    it("parses the location into an object", () => {
      let location;
      function LocationChecker(props) {
        location = props.location;
        return null;
      }

      expect(
        render(
          <StaticRouter location="/the/path?the=query#the-hash">
            <Route component={LocationChecker} />
          </StaticRouter>
        ).asFragment()
      ).toMatchSnapshot();

      expect(location).toMatchObject({
        pathname: "/the/path",
        search: "?the=query",
        hash: "#the-hash"
      });
    });

    describe("with a URL-encoded pathname", () => {
      it("decodes the pathname", () => {
        let props;
        function PropsChecker(p) {
          props = p;
          return null;
        }

        expect(
          render(
            <StaticRouter location="/est%C3%A1tico">
              <Route path="/:type" component={PropsChecker} />
            </StaticRouter>
          ).asFragment()
        ).toMatchSnapshot();

        expect(props.location.pathname).toEqual("/estático");
        expect(props.match.params.type).toBe("estático");
      });
    });
  });

  describe("with an object location prop", () => {
    it("adds missing properties", () => {
      let location;
      function LocationChecker(props) {
        location = props.location;
        return null;
      }

      expect(
        render(
          <StaticRouter location={{ pathname: "/the/path" }}>
            <Route component={LocationChecker} />
          </StaticRouter>
        ).asFragment()
      ).toMatchSnapshot();

      expect(location).toMatchObject({
        pathname: "/the/path",
        search: "",
        hash: ""
      });
    });

    describe("with a URL-encoded pathname", () => {
      it("decodes the pathname", () => {
        let props;
        function PropsChecker(p) {
          props = p;
          return null;
        }

        expect(
          render(
            <StaticRouter location={{ pathname: "/est%C3%A1tico" }}>
              <Route path="/:type" component={PropsChecker} />
            </StaticRouter>
          ).asFragment()
        ).toMatchSnapshot();

        expect(props.location.pathname).toEqual("/estático");
        expect(props.match.params.type).toBe("estático");
      });
    });
  });

  it("knows how to serialize location objects", () => {
    const context = {};

    expect(
      render(
        <StaticRouter context={context}>
          <Redirect to={{ pathname: "/somewhere-else" }} />
        </StaticRouter>
      ).asFragment()
    ).toMatchSnapshot();

    expect(get().app.history.staticContext).toMatchSnapshot();
  });

  describe("with a basename", () => {
    it("strips the basename from location pathnames", () => {
      let location;
      function LocationChecker(props) {
        location = props.location;
        return null;
      }

      const context = {};

      expect(
        render(
          <StaticRouter
            context={context}
            basename="/the-base"
            location="/the-base/path"
          >
            <Route component={LocationChecker} />
          </StaticRouter>
        ).asFragment()
      ).toMatchSnapshot();

      expect(location.pathname).toEqual("/path");
    });

    it("adds the basename to redirect URLs", () => {
      const context = {};

      expect(
        render(
          <StaticRouter context={context} basename="/the-base">
            <Redirect to="/somewhere-else" />
          </StaticRouter>
        ).asFragment()
      ).toMatchSnapshot();

      expect(get().app.history.staticContext).toMatchSnapshot();
    });

    it("adds the basename to push redirect URLs", () => {
      const context = {};

      expect(
        render(
          <StaticRouter context={context} basename="/the-base">
            <Redirect to="/somewhere-else" push />
          </StaticRouter>
        ).asFragment()
      ).toMatchSnapshot();

      expect(get().app.history.staticContext).toMatchSnapshot();
    });
  });

  describe("with no basename", () => {
    it("createHref does not append extra leading slash", () => {
      const pathname = "/test-path-please-ignore";

      function HrefChecker({ to, children }) {
        return (
          <Route
            children={({ history: { createHref } }) => (
              <a href={createHref(to)}>{children}</a>
            )}
          />
        );
      }

      expect(
        render(
          <StaticRouter>
            <HrefChecker to={pathname} />
          </StaticRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });
  });

  describe("render a <Prompt>", () => {
    it("does not throw", () => {
      expect(() => {
        render(
          <StaticRouter>
            <Prompt message="this is only a test" />
          </StaticRouter>
        );
      }).not.toThrow();
    });
  });
});
