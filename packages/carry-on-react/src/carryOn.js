/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-newline */
import React from "react";
import { mutateMerge } from "carry-on-utils";
import State from "./State";

export default (renderFn, stateProps) => {
  if (typeof renderFn === "object") {
    const actualStateProps = renderFn;
    renderFn = stateProps;
    stateProps = actualStateProps;
  }

  class CarryOnComponent extends React.Component {
    onMountCopy = undefined;

    onUnmountCopy = undefined;

    render() {
      const { from, debug, verbose, onMount, onUnmount, ...props } = this.props;

      const propProps = {
        from,
        debug,
        verbose,
        onMount,
        onUnmount
      };
      const finalProps = mutateMerge({}, stateProps, propProps);
      finalProps.id = props.id || (stateProps && stateProps.id);

      if (
        finalProps.onMount &&
        finalProps.onMount !== this.onMountCopy &&
        finalProps.onMount.length === 2
      ) {
        const origOnMount = finalProps.onMount;
        finalProps.onMount = state => origOnMount(props, state);
      }

      if (
        finalProps.onUnmount &&
        finalProps.onUnmount !== this.onUnmountCopy &&
        finalProps.onUnmount.length === 2
      ) {
        const origOnUnmount = finalProps.onUnmount;
        finalProps.onUnmount = state => origOnUnmount(props, state);
      }

      this.onMountCopy = finalProps.onMount;
      this.onUnmountCopy = finalProps.onUnmount;

      return (
        <State {...finalProps}>
          {state =>
            renderFn.length === 1 ? renderFn(state) : renderFn(props, state)
          }
        </State>
      );
    }
  }
  CarryOnComponent.displayName = (stateProps && stateProps.id) || "CarryOn";

  return CarryOnComponent;
};
