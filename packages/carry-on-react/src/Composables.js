import React from "react";
import State from "./State";

export function Register({ children, state, ...props }) {
  return <State register={{ state: state || children }} {...props} />;
}
Register.prop = "register";
Register.val = "children";
Register.transform = state => ({ state });
export function Middleware({ children, ...props }) {
  return <State register={{ middleware: children }} {...props} />;
}
Middleware.prop = "register";
Middleware.val = "children";
Middleware.transform = middleware => ({ middleware });
export const Render = () => null;
Render.prop = "render";
export const OnMount = () => null;
OnMount.prop = "onMount";
export const OnUnmount = () => null;
OnUnmount.prop = "onUnmount";
export const Select = () => null;
Select.prop = "select";
export const Path = () => null;
Path.prop = "path";
export const Default = () => null;
Default.prop = "default";
export const Throttle = () => null;
Throttle.prop = "throttle";
Throttle.val = "ms";
Throttle.default = 0;
export const Constant = () => null;
Constant.prop = "constant";
Constant.default = true;
export const Strict = () => null;
Strict.prop = "strict";
Strict.default = true;
export const Debounce = () => null;
Debounce.prop = "debounce";
Debounce.val = "ms";
Debounce.default = 0;
export const Debug = () => null;
Debug.prop = "debug";
Debug.val = "enabled";
Debug.default = true;
export const Verbose = () => null;
Verbose.prop = "verbose";
Verbose.val = "enabled";
Verbose.default = true;
export const Id = () => null;
Id.prop = "id";
