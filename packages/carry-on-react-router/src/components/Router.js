/* eslint-disable max-classes-per-file */
import { Component } from "react";
import { register, get } from "carry-on-store";
import { withStore } from "carry-on-react";
import { getIn } from "carry-on-utils";
import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory
} from "history";
import createStaticHistory from "../createStaticHistory";
import router from "../router";

const defaultProps = {
  path: "app.history"
};

export const Router = withStore(class Router extends Component {
  static defaultProps = { path: "app.history" };

  constructor(props) {
    super(props);
    register(router(props.history, props.path), props.store || props.from);
  }

  componentWillUnmount() {
    const { store, from, path } = this.props;
    const s = get(store || from);
    const h = getIn(s, path || "");
    if (h && h.unlisten) h.unlisten();
  }

  render() {
    const { children } = this.props;
    return children || null;
  }
});

export const MemoryRouter = withStore(class MemoryRouter extends Component {
  static defaultProps = { path: "app.history" };

  constructor(props) {
    super(props);
    register(
      router(createMemoryHistory(props), props.path),
      props.store || props.from
    );
  }

  componentWillUnmount() {
    const { store, from, path } = this.props;
    const s = get(store || from);
    const h = getIn(s, path || "");
    if (h && h.unlisten) h.unlisten();
  }

  render() {
    const { children } = this.props;
    return children || null;
  }
});

export const BrowserRouter = withStore(class BrowserRouter extends Component {
  static defaultProps = { path: "app.history" };

  constructor(props) {
    super(props);
    register(
      router(createBrowserHistory(props), props.path),
      props.store || props.from
    );
  }

  componentWillUnmount() {
    const { store, from, path } = this.props;
    const s = get(store || from);
    const h = getIn(s, path || "");
    if (h && h.unlisten) h.unlisten();
  }

  render() {
    const { children } = this.props;
    return children || null;
  }
});

export const HashRouter = withStore(class HashRouter extends Component {
  static defaultProps = { path: "app.history" };

  constructor(props) {
    super(props);
    register(
      router(createHashHistory(props), props.path, false),
      props.store || props.from
    );
  }

  componentWillUnmount() {
    const { store, from, path } = this.props;
    const s = get(store || from);
    const h = getIn(s, path || "");
    if (h && h.unlisten) h.unlisten();
  }

  render() {
    const { children } = this.props;
    return children || null;
  }
});

export const StaticRouter = withStore(class StaticRouter extends Component {
  static defaultProps = { path: "app.history" };

  constructor(props) {
    super(props);
    register(
      router(createStaticHistory(props), props.path, true),
      props.store || props.from
    );
  }

  componentWillUnmount() {
    const { store, from, path } = this.props;
    const s = get(store || from);
    const h = getIn(s, path || "");
    if (h && h.unlisten) h.unlisten();
  }

  render() {
    const { children } = this.props;
    return children || null;
  }
});
