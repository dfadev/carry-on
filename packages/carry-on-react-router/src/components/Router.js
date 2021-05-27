/* eslint-disable max-classes-per-file */
import { Component } from "react";
import { register, get } from "carry-on-store";
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

export class Router extends Component {
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
}

export class MemoryRouter extends Component {
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
}
MemoryRouter.defaultProps = defaultProps;

export class BrowserRouter extends Component {
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
}
BrowserRouter.defaultProps = defaultProps;

export class HashRouter extends Component {
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
}
HashRouter.defaultProps = defaultProps;

export class StaticRouter extends Component {
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
}
StaticRouter.defaultProps = defaultProps;
