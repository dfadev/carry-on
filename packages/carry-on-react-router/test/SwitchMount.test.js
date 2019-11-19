import React from "react";
import { render } from "@testing-library/react";
import { initStores } from "carry-on-store";
import { MemoryRouter } from "../src/components/Router";
import Route from "../src/components/Route";
import Switch from "../src/components/Switch";

describe("A <Switch>", () => {

  afterEach(() => {
    initStores();
  });

  it("does not remount a <Route>'s component", () => {
    let mountCount = 0;
    let push;

    class MountCounter extends React.Component {
      componentDidMount() {
        push = this.props.history.push;
        mountCount++;
      }

      render() {
        return null;
      }
    }

    render(
      <MemoryRouter initialEntries={["/one"]}>
        <Switch>
          <Route path="/one" component={MountCounter} />
          <Route path="/two" component={MountCounter} />
        </Switch>
      </MemoryRouter>
    );

    expect(mountCount).toBe(1);
    push("/two");

    expect(mountCount).toBe(1);
    push("/one");

    expect(mountCount).toBe(1);
  });
});
