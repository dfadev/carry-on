/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory as createHistory } from "history";
import { initStores } from "carry-on-store";
import { MemoryRouter, Router } from "../src/components/Router";
import Prompt from "../src/components/Prompt";

describe("A <Prompt>", () => {
  afterEach(() => {
    initStores();
  });

  describe("with no message", () => {
    it("renders", () => {
      expect(
        render(
          <MemoryRouter>
            <Prompt />
          </MemoryRouter>
        ).asFragment()
      ).toMatchSnapshot();
    });
  });

  it("calls getUserConfirmation with the prompt message", () => {
    const getUserConfirmation = jest.fn((message, callback) => {
      callback(false);
    });

    const history = createHistory({
      getUserConfirmation
    });

    render(
      <Router history={history}>
        <Prompt message="Are you sure?" />
      </Router>
    );

    history.push("/somewhere");

    expect(getUserConfirmation).toHaveBeenCalledWith(
      expect.stringMatching("Are you sure?"),
      expect.any(Function)
    );
  });

  describe("with when=false", () => {
    it("does not call getUserConfirmation", () => {
      const getUserConfirmation = jest.fn((message, callback) => {
        callback(false);
      });

      const history = createHistory({
        getUserConfirmation
      });

      render(
        <Router history={history}>
          <Prompt message="Are you sure?" when={false} />
        </Router>
      );

      history.push("/somewhere");

      expect(getUserConfirmation).not.toHaveBeenCalled();
    });
  });
});
