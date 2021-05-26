import React from "react";
import * as buble from "buble";
import Inspector from "react-inspector";
import {
  register,
  initStores,
  getStore,
  connect,
  deleteStore,
  get,
  set,
  watch,
  Watch,
  debugStore,
  debugStores,
  devTools
} from "carry-on-store";
import { Store, State, carryOn } from "carry-on-react";
import { Form, Field, FormButtons, FormState } from "carry-on-react-forms";
import {
  BrowserRouter,
  HashRouter,
  Link,
  MemoryRouter,
  NavLink,
  Prompt,
  Redirect,
  Route,
  Routes,
  StaticRouter,
  Switch,
  createStaticHistory,
  matchPath,
  router,
  withRouter
} from "carry-on-react-router";
import theme from "./inspector-theme";

const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

if (canUseDOM) {
  debugStores(true);
  State.Debug = true;

  const opts = {
    objectAssign: "Object.assign",
    transforms: {
      moduleImport: false,
      dangerousForOf: true,
      dangerousTaggedTemplateString: true
    }
  };

  const origTransform = buble.transform;
  buble.transform = code => {
    const removeImports = code
      .split("\n")
      .filter(line => !line.startsWith("import"))
      .join("\n");
    return origTransform(removeImports, opts);
  };
}

const ReactLiveScope = {
  React,
  ...React,
  BrowserRouter,
  Field,
  Form,
  FormButtons,
  FormState,
  HashRouter,
  Link,
  MemoryRouter,
  NavLink,
  Prompt,
  Redirect,
  Route,
  Routes,
  State,
  StaticRouter,
  Store,
  Switch,
  Watch,
  carryOn,
  connect,
  createStaticHistory,
  debugStore,
  debugStores,
  deleteStore,
  devTools,
  get,
  getStore,
  initStores,
  matchPath,
  register,
  router,
  set,
  watch,
  withRouter,
  StateInspector: ({ from, select = s => ({ ...s }), ...rest }) => (
    <State id="Inspector" from={from} select={select} {...rest}>
      {state => (
        <div style={{ marginBottom: "12px" }}>
          <Inspector data={state} theme={theme} expandLevel={2} />
        </div>
      )}
    </State>
  ),
  Inspector: props => (
    <div style={{ marginBottom: "12px" }}>
      <Inspector theme={theme} {...props} />
    </div>
  )
};

export default ReactLiveScope;
