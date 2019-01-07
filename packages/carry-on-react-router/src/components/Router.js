import { Component } from "react";
//import { carryOn } from "carry-on-react";
//import { getIn } from "carry-on-utils";
import { register } from "carry-on-store";
import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory
} from "history";
import createStaticHistory from "../createStaticHistory";
import router from "../router";

let hasRegistered = false;

export class Router extends Component {
  constructor(props) {
    super(props);
    if (hasRegistered) return;
    hasRegistered = true;
    register(router(props.history, props.path), props.store);
  }

  render() {
    return this.props.children || null;
  }
}

export class MemoryRouter extends Component {
  constructor(props) {
    super(props);
    if (hasRegistered) return;
    hasRegistered = true;
    register(router(createMemoryHistory(props), props.path), props.store);
  }

  render() {
    return this.props.children || null;
  }
}

export class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    if (hasRegistered) return;
    hasRegistered = true;
    register(router(createBrowserHistory(props), props.path), props.store);
  }

  render() {
    return this.props.children || null;
  }
}

export class HashRouter extends Component {
  constructor(props) {
    super(props);
    if (hasRegistered) return;
    hasRegistered = true;
    register(router(createHashHistory(props), props.path), props.store);
  }

  render() {
    return this.props.children || null;
  }
}

export class StaticRouter extends Component {
  constructor(props) {
    super(props);
    if (hasRegistered) return;
    hasRegistered = true;
    register(router(createStaticHistory(props), props.path), props.store);
  }

  render() {
    return this.props.children || null;
  }
}