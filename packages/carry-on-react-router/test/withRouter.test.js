import React from "react";
import { render } from "@testing-library/react";
import { initStores, connect } from "carry-on-store";
import * as ReactIs from "react-is";
import { MemoryRouter, StaticRouter } from "../src/components/Router";
import Route from "../src/components/Route";
import withRouter from "../src/components/withRouter";

describe("withRouter", () => {
  afterEach(() => {
    initStores();
  });

  it("provides { match, location, history } props", () => {
    let props;

    const PropsChecker = withRouter(p => {
      props = p;
      return null;
    });

    render(
      <MemoryRouter>
        <PropsChecker />
      </MemoryRouter>
    );

    expect(typeof props).toBe("object");
    expect(typeof props.match).toBe("object");
    expect(typeof props.location).toBe("object");
    expect(typeof props.history).toBe("object");
  });

  it("provides the parent match as a prop to the wrapped component", () => {
    let parentMatch; let props;

    const PropsChecker = withRouter(p => {
      props = p;
      return null;
    });

    render(
      <MemoryRouter initialEntries={["/bubblegum"]}>
        <Route
          path="/:flavor"
          render={({ match }) => {
            parentMatch = match;
            return <PropsChecker />;
          }}
        />
      </MemoryRouter>
    );

    expect(typeof parentMatch).toBe("object");
    expect(typeof props).toBe("object");
    expect(props.match).toEqual(parentMatch);
  });

  it("works when parent match is null", () => {
    let parentMatch; let props;

    const PropChecker = withRouter(p => {
      props = p;
      return null;
    });

    render(
      <MemoryRouter initialEntries={["/somepath"]}>
        <Route path="/no-match">
          {({ match }) => {
            parentMatch = match;
            return <PropChecker />;
          }}
        </Route>
      </MemoryRouter>
    );

    expect(parentMatch).toBe(null);
    expect(typeof props).toBe("object");
    expect(props.match).toBe(null);
  });

  describe("inside a <StaticRouter>", () => {
    it("provides the staticContext prop", () => {
      let props;

      const PropsChecker = withRouter(p => {
        props = p;
        return null;
      });

      const context = { field: "value" };

      render(
        <StaticRouter context={context}>
          <Route component={PropsChecker} />
        </StaticRouter>
      );

      expect(typeof props).toBe("object");
      expect(typeof props.staticContext).toBe("object");
      expect(props.staticContext).toEqual(context);
    });
  });

  it("exposes the wrapped component as WrappedComponent", () => {
    const Component = () => <div />;
    const decorated = withRouter(Component);
    expect(decorated.WrappedComponent).toBe(Component);
  });

  it("exposes the instance of the wrapped component via wrappedComponentRef", () => {
    class WrappedComponent extends React.Component {
      render() {
        return null;
      }
    }
    const Component = withRouter(WrappedComponent);

    let ref;
    render(
      <MemoryRouter initialEntries={["/bubblegum"]}>
        <Route
          path="/bubblegum"
          render={() => <Component wrappedComponentRef={r => (ref = r)} />}
        />
      </MemoryRouter>
    );

    expect(ref instanceof WrappedComponent).toBe(true);
  });

  it("hoists non-react statics from the wrapped component", () => {
    class Component extends React.Component {
      static foo() {
        return "bar";
      }

      render() {
        return null;
      }
    }
    Component.hello = "world";

    const decorated = withRouter(Component);

    expect(decorated.hello).toBe("world");
    expect(typeof decorated.foo).toBe("function");
    expect(decorated.foo()).toBe("bar");
  });

  it("does not allow ref forwarding", () => {
    const WrappedComponent = React.forwardRef((props, ref) => (
      <div {...props} ref={ref} />
    ));
    const Component = withRouter(WrappedComponent);
    expect(ReactIs.isForwardRef(<Component />)).toBe(false);
  });
});
