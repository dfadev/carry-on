/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { register } from "carry-on-store";
import { State } from "carry-on-react";

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  register,
  State
};

export default ReactLiveScope;
