/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import {
  register,
  initStores,
  getStore,
  connect,
  deleteStore
} from "carry-on-store";
import { State } from "carry-on-react";
import {
  Form,
  Field,
  FormButtons,
  FormContext,
  FormState
} from "carry-on-react-forms";
import Inspector from "react-inspector";
import theme from "./inspector-theme";

const ReactLiveScope = {
  React,
  ...React,
  connect,
  register,
  initStores,
  deleteStore,
  State,
  Form,
  Field,
  FormButtons,
  FormContext,
  FormState,
  getStore,
  StateInspector: ({ from, select = s => ({ ...s }), ...rest }) => (
    <State from={from} select={select} {...rest}>
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
