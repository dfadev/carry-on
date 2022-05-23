/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import { initStores } from "carry-on-store";
import { MemoryRouter } from "../src/components/Router";
import Redirect from "../src/components/Redirect";
import Switch from "../src/components/Switch";
import Route from "../src/components/Route";

describe("A <Redirect>", () => {
  afterEach(() => {
    initStores();
  });

  describe("inside a <Switch>", () => {
    it("automatically interpolates params", () => {
      let params;

      render(
        <MemoryRouter initialEntries={["/users/mjackson/messages/123"]}>
          <Switch>
            <Redirect
              path="/users/:username/messages/:messageId"
              to="/:username/messages/:messageId"
            />
            <Route
              path="/:username/messages/:messageId"
              render={({ match }) => {
                params = match.params;
                return null;
              }}
            />
          </Switch>
        </MemoryRouter>
      ).asFragment();

      expect(params).toMatchObject({
        username: "mjackson",
        messageId: "123"
      });
    });
  });
});
