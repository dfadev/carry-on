import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory as createHistory } from "history";
import { MemoryRouter, Router } from "../src/components/Router";
import Route from "../src/components/Route";
import { initStores } from "carry-on-store";

it("route renders", () => {
  expect(
    render(
      <Router>
        <Route>
          <div>ok</div>
        </Route>
      </Router>
    ).asFragment()
  ).toMatchSnapshot();
});

describe("A <Route>", () => {
  afterEach(() => {
    initStores();
  });

  //describe("without a <Router>", () => {
  //it("throws an error", () => {
  //jest.spyOn(console, "error").mockImplementation(() => {});

  //expect(() => {
  //renderStrict(<Route />, node);
  //}).toThrow(/You should not use <Route> outside a <Router>/);
  //});
  //});

  it("renders when it matches", () => {
    const text = "cupcakes";

    expect(
      render(
        <MemoryRouter initialEntries={["/cupcakes"]}>
          <Route path="/cupcakes" render={() => <h1>{text}</h1>} />
        </MemoryRouter>
      ).asFragment()
    ).toMatchSnapshot();
  });

  it("renders when it matches at the root URL", () => {
    const text = "cupcakes";

    expect(
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Route path="/" render={() => <h1>{text}</h1>} />
        </MemoryRouter>
      ).asFragment()
    ).toMatchSnapshot();
  });

  it("does not render when it does not match", () => {
    const text = "bubblegum";

    expect(
      render(
        <MemoryRouter initialEntries={["/bunnies"]}>
          <Route path="/flowers" render={() => <h1>{text}</h1>} />
        </MemoryRouter>
      ).asFragment()
    ).toMatchSnapshot();
  });

  it("matches using nextContext when updating", () => {
    const history = createHistory({
      initialEntries: ["/sushi/california"]
    });

    const { asFragment } = render(
      <Router history={history}>
        <Route
          path="/sushi/:roll"
          render={({ match }) => <h1>{match.url}</h1>}
        />
      </Router>
    );

    history.push("/sushi/spicy-tuna");

    expect(asFragment()).toMatchSnapshot();
  });

  describe("with dynamic segments in the path", () => {
    it("decodes them", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/a%20dynamic%20segment"]}>
            <Route
              path="/:id"
              render={({ match }) => <h1>{match.params.id}</h1>}
            />
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });
  });

  describe("with an array of paths", () => {
    it("matches the first provided path", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/hello"]}>
            <Route
              path={["/hello", "/world"]}
              render={() => <div>Hello World</div>}
            />
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("matches other provided paths", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/other", "/world"]} initialIndex={1}>
            <Route
              path={["/hello", "/world"]}
              render={() => <div>Hello World</div>}
            />
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("provides the matched path as a string", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/other", "/world"]} initialIndex={1}>
            <Route
              path={["/hello", "/world"]}
              render={({ match }) => <div>{match.path}</div>}
            />
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("doesn't remount when moving from one matching path to another", () => {
      const history = createHistory();
      const mount = jest.fn();
      class MatchedRoute extends React.Component {
        componentDidMount() {
          mount();
        }

        render() {
          return <div>Hello World</div>;
        }
      }
      history.push("/hello");
      const { asFragment } = render(
        <Router history={history}>
          <Route path={["/hello", "/world"]} component={MatchedRoute} />
        </Router>
      );

      expect(mount).toHaveBeenCalledTimes(1);
      //expect(node.innerHTML).toContain("Hello World");
      expect(asFragment()).toMatchSnapshot();

      history.push("/world/somewhere/else");

      expect(mount).toHaveBeenCalledTimes(1);
      //expect(node.innerHTML).toContain("Hello World");
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("with a unicode path", () => {
    it("is able to match", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/パス名"]}>
            <Route
              path="/パス名"
              render={({ match }) => <h1>{match.url}</h1>}
            />
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });
  });

  describe("with escaped special characters in the path", () => {
    it("is able to match", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza (1)"]}>
            <Route
              path="/pizza \(1\)"
              render={({ match }) => <h1>{match.url}</h1>}
            />
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });
  });

  describe("with `exact=true`", () => {
    it("renders when the URL does not have a trailing slash", () => {
      const text = "bubblegum";

      expect(
        render(
          <MemoryRouter initialEntries={["/somepath/"]}>
            <Route exact path="/somepath" render={() => <h1>{text}</h1>} />
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    // path-to-regexp does not support this mode of operation
    //
    //it("renders when the URL has trailing slash", () => {
    //const text = "bubblegum";

    //expect(
    //render(
    //<MemoryRouter initialEntries={["/somepath"]}>
    //<Route exact path="/somepath/" render={() => <h1>{text}</h1>} />
    //</MemoryRouter>
    //).asFragment()
    //).toMatchSnapshot();
    //});

    describe("and `strict=true`", () => {
      it("does not render when the URL has a trailing slash", () => {
        const text = "bubblegum";

        expect(
          render(
            <MemoryRouter initialEntries={["/somepath/"]}>
              <Route
                exact
                strict
                path="/somepath"
                render={() => <h1>{text}</h1>}
              />
            </MemoryRouter>
          ).asFragment()
        ).toMatchSnapshot();
      });

      it("does not render when the URL does not have a trailing slash", () => {
        const text = "bubblegum";

        expect(
          render(
            <MemoryRouter initialEntries={["/somepath"]}>
              <Route
                exact
                strict
                path="/somepath/"
                render={() => <h1>{text}</h1>}
              />
            </MemoryRouter>
          ).asFragment()
        ).toMatchSnapshot();
      });
    });
  });

  describe("the `location` prop", () => {
    it("overrides `context.location`", () => {
      const text = "bubblegum";

      expect(
        render(
          <MemoryRouter initialEntries={["/cupcakes"]}>
            <Route
              location={{ pathname: "/bubblegum" }}
              path="/bubblegum"
              render={() => <h1>{text}</h1>}
            />
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });
  });

  describe("the `children` prop", () => {
    describe("that is an element", () => {
      it("renders", () => {
        const text = "bubblegum";

        expect(
          render(
            <MemoryRouter initialEntries={["/"]}>
              <Route path="/">
                <h1>{text}</h1>
              </Route>
            </MemoryRouter>
          ).asFragment()
        ).toMatchSnapshot();
      });
    });

    describe("that is a function", () => {
      it("receives { history, location, match } props", () => {
        const history = createHistory();

        let props = null;
        render(
          <Router history={history}>
            <Route
              path="/"
              children={p => {
                props = p;
                return null;
              }}
            />
          </Router>
        );

        expect(props).not.toBe(null);
        expect(typeof props.history).toBe("object");
        expect(typeof props.location).toBe("object");
        expect(typeof props.match).toBe("object");
      });

      it("renders", () => {
        const text = "bubblegum";

        expect(
          render(
            <MemoryRouter initialEntries={["/"]}>
              <Route path="/" children={() => <h1>{text}</h1>} />
            </MemoryRouter>
          ).asFragment()
        ).toMatchSnapshot();
      });

      //describe("that returns `undefined`", () => {
      //it("logs a warning to the console and renders nothing", () => {
      //jest.spyOn(console, "warn").mockImplementation(() => {});

      //expect(render(
      //<MemoryRouter initialEntries={["/"]}>
      //<Route path="/" children={() => undefined} />
      //</MemoryRouter>,
      //node
      //);

      //expect(node.innerHTML).toEqual("");

      //expect(console.warn).toHaveBeenCalledWith(
      //expect.stringContaining(
      //"You returned `undefined` from the `children` function"
      //)
      //);
      //});
      //});
    });

    describe("that is an empty array (as in Preact)", () => {
      it("ignores the children", () => {
        const text = "bubblegum";

        expect(
          render(
            <MemoryRouter>
              <Route render={() => <h1>{text}</h1>}>{[]}</Route>
            </MemoryRouter>
          ).asFragment()
        ).toMatchSnapshot();
      });
    });
  });

  describe("the `component` prop", () => {
    it("renders the component", () => {
      const text = "bubblegum";

      const Home = () => <h1>{text}</h1>;

      expect(
        render(
          <MemoryRouter initialEntries={["/"]}>
            <Route path="/" component={Home} />
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("receives { history, location, match } props", () => {
      const history = createHistory();

      let props = null;
      const Component = p => {
        props = p;
        return null;
      };

      render(
        <Router history={history}>
          <Route path="/" component={Component} />
        </Router>
      );

      expect(props).not.toBe(null);
      expect(typeof props.history).toBe("object");
      expect(typeof props.location).toBe("object");
      expect(typeof props.match).toBe("object");
    });

    it("won't throw a prop-type warning when passed valid React components that aren't functions", () => {
      function forwardRef(Component) {
        class ForwardComponent extends React.Component {
          render() {
            const { forwardedRef, ...rest } = this.props;
            return <Component ref={forwardedRef} {...rest} />;
          }
        }
        return React.forwardRef((props, ref) => {
          return <ForwardComponent {...props} forwardedRef={ref} />;
        });
      }

      const history = createHistory();
      const Component = () => null;
      const WrappedComponent = forwardRef(Component);
      jest.spyOn(console, "error").mockImplementation(() => {});

      render(
        <Router history={history}>
          <Route path="/" component={WrappedComponent} />
        </Router>
      );

      expect(console.error).not.toHaveBeenCalled();
    });
  });

  describe("the `render` prop", () => {
    it("renders its return value", () => {
      const text = "Mrs. Kato";

      expect(
        render(
          <MemoryRouter initialEntries={["/"]}>
            <Route path="/" render={() => <h1>{text}</h1>} />
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("receives { history, location, match } props", () => {
      const history = createHistory();

      let props = null;
      render(
        <Router history={history}>
          <Route
            path="/"
            render={p => {
              props = p;
              return null;
            }}
          />
        </Router>
      );

      expect(props).not.toBe(null);
      expect(typeof props.history).toBe("object");
      expect(typeof props.location).toBe("object");
      expect(typeof props.match).toBe("object");
    });
  });
});
