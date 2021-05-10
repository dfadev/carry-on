/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { register, initStores, getStore, connect } from "carry-on-store";
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
  State,
  Form,
  Field,
  FormButtons,
  FormContext,
  FormState,
  getStore,
  Inspector: props => <Inspector theme={theme} {...props} />
};

export default ReactLiveScope;
