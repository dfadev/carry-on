import React from "react";
import * as buble from "buble";
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
import { State, carryOn } from "carry-on-react";
import {
  Form,
  Field,
  FormButtons,
  FormContext,
  FormState
} from "carry-on-react-forms";
import Inspector from "react-inspector";
import theme from "./inspector-theme";

debugStores(true);
State.Debug = true;

const opts = {
  objectAssign: Object.assign,
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

const ReactLiveScope = {
  React,
  ...React,
  connect,
  register,
  initStores,
  deleteStore,
  get,
  set,
  watch,
  Watch,
  State,
  carryOn,
  Form,
  Field,
  FormButtons,
  FormContext,
  FormState,
  getStore,
  debugStore,
  debugStores,
  devTools,
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
