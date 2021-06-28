/* eslint-disable max-classes-per-file */
import React, { Component } from "react";
import { register, get } from "carry-on-store";
import { withStore, State, Register, OnUnmount, Render } from "carry-on-react";
import { getIn } from "carry-on-utils";
import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory
} from "history";
import createStaticHistory from "../createStaticHistory";
import router from "../router";

const GenericRouter = (createHistory = createBrowserHistory) =>
  withStore(({ children = null, path = "app.history", ...props }) => (
    <State {...props}>
      <Register>{router(createHistory(props), path)}</Register>
      <OnUnmount>
        {state =>
          state &&
          state.app &&
          state.app.history &&
          state.app.history.unlisten &&
          state.app.history.unlisten()
        }
      </OnUnmount>
      <Render>{() => children || null}</Render>
    </State>
  ));

export const Router = GenericRouter(props => props.history);
export const MemoryRouter = GenericRouter(createMemoryHistory);
export const BrowserRouter = GenericRouter(createBrowserHistory);
export const HashRouter = GenericRouter(createHashHistory);
export const StaticRouter = GenericRouter(createStaticHistory);
