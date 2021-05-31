/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import { initStores } from "carry-on-store";
import { MemoryRouter, Router } from "../src/components/Router";
import Route from "../src/components/Route";

describe("Integration Tests", () => {
  afterEach(() => {
    initStores();
  });

  it("renders nested matches", () => {
    const TEXT1 = "Ms. Tripp";
    const TEXT2 = "Mrs. Schiffman";

    expect(
      render(
        <MemoryRouter initialEntries={["/nested"]}>
          <Route
            path="/"
            render={() => (
              <div>
                <h1>{TEXT1}</h1>
                <Route path="/nested" render={() => <h2>{TEXT2}</h2>} />
              </div>
            )}
          />
        </MemoryRouter>
      ).asFragment()
    ).toMatchSnapshot();
  });

  it("renders only as deep as the matching Route", () => {
    const TEXT1 = "Ms. Tripp";
    const TEXT2 = "Mrs. Schiffman";

    expect(
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Route
            path="/"
            render={() => (
              <div>
                <h1>{TEXT1}</h1>
                <Route path="/nested" render={() => <h2>{TEXT2}</h2>} />
              </div>
            )}
          />
        </MemoryRouter>
      ).asFragment()
    ).toMatchSnapshot();
  });

  it("renders multiple matching routes", () => {
    const TEXT1 = "Mrs. Schiffman";
    const TEXT2 = "Mrs. Burton";

    expect(
      render(
        <MemoryRouter initialEntries={["/double"]}>
          <div>
            <aside>
              <Route path="/double" render={() => <h1>{TEXT1}</h1>} />
            </aside>
            <main>
              <Route path="/double" render={() => <h1>{TEXT2}</h1>} />
            </main>
          </div>
        </MemoryRouter>
      ).asFragment()
    ).toMatchSnapshot();
  });
});
