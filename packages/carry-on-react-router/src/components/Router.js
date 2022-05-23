/* eslint-disable max-classes-per-file */
import React, { useMemo } from "react";
import {
  withStore,
  State,
  Register,
  Middleware,
  OnUnmount,
  Render
} from "carry-on-react";
import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory
} from "history";
import createStaticHistory from "../createStaticHistory";
import router from "../router";

function GenericRouter(createHistory = createBrowserHistory) {
  return withStore(({ children = null, path = "app.history", ...props }) => {
    const rtr = useMemo(() => router(createHistory(props), path), [path]);

    return (
      <State {...props}>
        <Register>{rtr.state}</Register>
        <Middleware>{rtr.middleware}</Middleware>
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
    );
  });
}

export const Router = GenericRouter(props => props.history);
export const MemoryRouter = GenericRouter(createMemoryHistory);
export const BrowserRouter = GenericRouter(createBrowserHistory);
export const HashRouter = GenericRouter(createHashHistory);
export const StaticRouter = GenericRouter(createStaticHistory);
