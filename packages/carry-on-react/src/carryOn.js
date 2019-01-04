/** @format **/
import React from "react";
import { mutateMerge } from "carry-on-utils";
import State from "./State";

export default (renderFn, stateProps) => {
  if (typeof renderFn === "object") {
    const actualStateProps = renderFn;
    renderFn = stateProps;
    stateProps = actualStateProps;
  }

  const Component = ({ from, debug, verbose, ...props }) => {
    const propProps = {
      from,
      debug,
      verbose
    };
    const fnProps = {
      ...stateProps
    };
    const finalProps = mutateMerge({}, fnProps, propProps);
    finalProps.id = props.id || (stateProps && stateProps.id);

    if (finalProps.onMount) {
      const origOnMount = finalProps.onMount;
      finalProps.onMount = state => origOnMount(state, props);
    }

    if (finalProps.onUnmount) {
      const origOnUnmount = finalProps.onUnmount;
      finalProps.onUnmount = state => origOnUnmount(state, props);
    }

    return (
      <State {...finalProps}>
        {state =>
          renderFn.length === 1 ? renderFn(state) : renderFn(props, state)
        }
      </State>
    );
  };

  Component.displayName = (stateProps && stateProps.id) || "CarryOn";

  return Component;
};
