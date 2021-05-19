/* eslint-disable max-classes-per-file */
import { Component } from "react";
import { register } from "carry-on-store";
import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory
} from "history";
import createStaticHistory from "../createStaticHistory";
import router from "../router";

export class Router extends Component {
  constructor(props) {
    super(props);
    register(router(props.history, props.path), props.store);
  }

  render() {
    const { children } = this.props;
    return children || null;
  }
}

export class MemoryRouter extends Component {
  constructor(props) {
    super(props);
    register(router(createMemoryHistory(props), props.path), props.store);
  }

  render() {
    const { children } = this.props;
    return children || null;
  }
}

export class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    register(router(createBrowserHistory(props), props.path), props.store);
  }

  render() {
    const { children } = this.props;
    return children || null;
  }
}

export class HashRouter extends Component {
  constructor(props) {
    super(props);
    register(router(createHashHistory(props), props.path), props.store);
  }

  render() {
    const { children } = this.props;
    return children || null;
  }
}

export class StaticRouter extends Component {
  constructor(props) {
    super(props);
    register(router(createStaticHistory(props), props.path, true), props.store);
  }

  render() {
    const { children } = this.props;
    return children || null;
  }
}
