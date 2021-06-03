/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import State from "./State";

export default (renderFn, stateProps) => {
  if (typeof renderFn === "object") {
    const actualStateProps = renderFn;
    renderFn = stateProps;
    stateProps = actualStateProps;
  }

  const CarryOnComponent = ({ from, debug, verbose, onMount, onUnmount, ...props }) => {
    const finalProps = { ...stateProps };
    if (from !== undefined) finalProps.from = from;
    if (debug !== undefined) finalProps.debug = debug;
    if (verbose !== undefined) finalProps.verbose = verbose;
    if (onMount !== undefined) finalProps.onMount = onMount;
    if (onUnmount !== undefined) finalProps.onUnmount = onUnmount;
    /* eslint-disable-next-line */
    if (props.id !== undefined) finalProps.id = props.id;

    return (
      <State {...finalProps}>
        {state =>
          renderFn.length === 1 ? renderFn(state) : renderFn(props, state)
        }
      </State>
    );
  };

  CarryOnComponent.displayName = (stateProps && stateProps.id) || "CarryOn";

  return CarryOnComponent;
};
