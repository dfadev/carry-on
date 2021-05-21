import React from "react";
import { render } from "@testing-library/react";
import { initStores } from "carry-on-store";
import { MemoryRouter } from "../src/components/Router";
import NavLink from "../src/components/NavLink";
import withRouter from "../src/components/withRouter";

describe("A <NavLink>", () => {
  afterEach(() => {
    initStores();
  });

  describe("when active", () => {
    it("applies its default activeClassName", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink to="/pizza">Pizza!</NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("applies a custom activeClassName instead of the default", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink to="/pizza" activeClassName="selected">
              Pizza!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("applies its activeStyle", () => {
      const defaultStyle = { color: "black" };
      const activeStyle = { color: "red" };

      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink to="/pizza" style={defaultStyle} activeStyle={activeStyle}>
              Pizza!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("applies the default aria-current", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink to="/pizza">Pizza!</NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("applies a custom aria-current instead of the default", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink to="/pizza" aria-current="true">
              Pizza!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("handles locations without a pathname", () => {
      expect(() => {
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink to={{ search: "foo=bar" }}>Pizza!</NavLink>
          </MemoryRouter>
        ).asFragment();
      }).not.toThrow();
    });

    it("automatically escapes special characters in the path", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza (1)"]}>
            <NavLink to="/pizza (1)">Pizza!</NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("renders child components that use withRouter", () => {
      class WrappedComponent extends React.Component {
        render() {
          return null;
        }
      }

      const Component = withRouter(WrappedComponent);

      let ref;
      render(
        <MemoryRouter initialEntries={["/pizza"]}>
          <NavLink to="/pizza">
            <Component wrappedComponentRef={r => (ref = r)} />
          </NavLink>
        </MemoryRouter>
      );

      expect(ref instanceof WrappedComponent).toBe(true);
    });
  });

  describe("when inactive", () => {
    it("does not apply its default activeClassName", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink to="/salad">Salad?</NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("does not apply its activeClassName", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink to="/salad" activeClassName="selected">
              Salad?
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("does not apply its activeStyle", () => {
      const defaultStyle = { color: "black" };
      const activeStyle = { color: "red" };

      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink to="/salad" style={defaultStyle} activeStyle={activeStyle}>
              Salad?
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("does not apply an aria-current value if no override value is given", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink to="/salad" activeClassName="selected" aria-current="page">
              Pizza!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("does not apply an aria-current value if an override value is given", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink to="/salad" activeClassName="selected">
              Pizza!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("renders child components that use withRouter", () => {
      class WrappedComponent extends React.Component {
        render() {
          return null;
        }
      }

      const Component = withRouter(WrappedComponent);

      let ref;
      render(
        <MemoryRouter initialEntries={["/pizza"]}>
          <NavLink exact to="/salad">
            <Component wrappedComponentRef={r => (ref = r)} />
          </NavLink>
        </MemoryRouter>
      ).asFragment();

      expect(ref instanceof WrappedComponent).toBe(true);
    });
  });

  describe("isActive", () => {
    it("applies active default props when isActive returns true", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink to="/pizza" isActive={() => true}>
              Pizza!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("applies activeClassName when isActive returns true", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink
              to="/pizza"
              activeClassName="selected"
              isActive={() => true}
            >
              Pizza!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("does not apply default activeClassName when isActive returns false", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink to="/pizza" isActive={() => false}>
              Pizza!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("does not apply custom activeClassName when isActive returns false", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink
              to="/pizza"
              activeClassName="selected"
              isActive={() => false}
            >
              Pizza!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });
  });

  it("does not do exact matching by default", () => {
    expect(
      render(
        <MemoryRouter initialEntries={["/pizza/anchovies"]}>
          <NavLink to="/pizza" activeClassName="active">
            Pizza!
          </NavLink>
        </MemoryRouter>
      ).asFragment()
    ).toMatchSnapshot();
  });

  describe("with `exact=true`", () => {
    it("applies default activeClassName for exact matches", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink exact to="/pizza">
              Pizza!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("does not apply default activeClassName for partial matches", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza/anchovies"]}>
            <NavLink exact to="/pizza">
              Pizza!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("applies custom activeClassName for exact matches", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink exact to="/pizza" activeClassName="selected">
              Pizza!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("applies custom activeClassName for partial matches", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza/anchovies"]}>
            <NavLink exact to="/pizza" activeClassName="selected">
              Pizza!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });
  });

  // does not apply due to path-to-regexp change
  // it("does not do strict matching by default", () => {
  // expect(
  // render(
  // <MemoryRouter initialEntries={["/pizza"]}>
  // <NavLink to="/pizza/">Pizza!</NavLink>
  // </MemoryRouter>
  // ).asFragment()
  // ).toMatchSnapshot();
  // });

  describe("with `strict=true`", () => {
    it("applies default activeClassName for strict matches", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza/"]}>
            <NavLink strict to="/pizza/">
              Pizza!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("does not apply default activeClassName for non-strict matches", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink strict to="/pizza/">
              Pizza!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("applies custom activeClassName for strict matches", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza/"]}>
            <NavLink strict to="/pizza/" activeClassName="selected">
              Pizza!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("does not apply custom activeClassName for non-strict matches", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink strict to="/pizza/" activeClassName="selected">
              Pizza!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });
  });

  describe("the `location` prop", () => {
    it("overrides the current location", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pizza"]}>
            <NavLink to="/pasta" location={{ pathname: "/pasta" }}>
              Pasta!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });

    it("is not overwritten by the current location", () => {
      expect(
        render(
          <MemoryRouter initialEntries={["/pasta"]}>
            <NavLink to="/pasta" location={{ pathname: "/pizza" }}>
              Pasta!
            </NavLink>
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });
  });
});
