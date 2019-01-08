import React from "react";
import { render } from "react-testing-library";
import { createMemoryHistory } from "history";
import { register, connect } from "carry-on-store";
import { MemoryRouter, Router } from "../src/components/Router";
import NavLink from "../src/components/NavLink";
import withRouter from "../src/components/withRouter";
import Redirect from "../src/components/Redirect";
import Switch from "../src/components/Switch";
import Route from "../src/components/Route";
import { initStores } from "carry-on-store";
import router from "../src/router";

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
