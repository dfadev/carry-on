/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";

const nodesToProps = children => {
  const childs = Array.isArray(children) ? children : [children];

  const newProps = {};

  for (let i = 0, len = childs.length; i < len; i += 1) {
    const child = childs[i];
    /* eslint-disable-next-line no-continue */
    if (child === undefined || child === null) continue;

    // fetch node map config
    const {
      prop,
      val = "children",
      transform,
      default: def
    } = child.type || {};

    // retrieve value
    let v = child.props && child.props[val];

    // default value
    if (v === undefined) v = def;

    // transform value
    v = transform ? transform(v, child.props) : v;

    // present as array when multiple nodes
    const curProp = newProps[prop];
    if (curProp !== undefined) {
      if (Array.isArray(curProp)) {
        curProp.push(v);
      } else {
        newProps[prop] = [curProp, v];
      }
    } else newProps[prop] = v;
  }

  return newProps;
};

const withNodesToProps = WrappedComponent => {
  const WithNodesToProps = ({ children, ...props }) =>
    !Array.isArray(children) && typeof children === "function" ? (
      <WrappedComponent {...props}>{children}</WrappedComponent>
    ) : (
      <WrappedComponent {...props} {...nodesToProps(children)} />
    );

  WithNodesToProps.displayName = "withNodesToProps";
  WithNodesToProps.WrappedComponent = WrappedComponent;

  return hoistNonReactStatic(WithNodesToProps, WrappedComponent);
};

export default withNodesToProps;
