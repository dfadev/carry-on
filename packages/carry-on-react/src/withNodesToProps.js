/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";

const withNodesToProps = WrappedComponent => {
  const WithNodesToProps = ({ children, ...props }) => {
    if (!Array.isArray(children))
      return <WrappedComponent {...props}>{children}</WrappedComponent>;

    const newProps = {};

    for (let i = 0, len = children.length; i < len; i += 1) {
      const child = children[i];

      // fetch node map config
      const name = (child.type && child.type.name) || "nodesToProp";
      const {
        prop = name.charAt(0).toLowerCase() + name.slice(1),
        val = "children",
        transform,
        default: def
      } = child.type || {};

      // retrieve value
      let v = child.props[val];

      // default value
      if (v === undefined) v = def;

      // transform value
      v = transform ? transform(v) : v;

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

    return <WrappedComponent {...props} {...newProps} />;
  };

  WithNodesToProps.displayName = "withNodesToProps";
  WithNodesToProps.WrappedComponent = WrappedComponent;

  return hoistNonReactStatic(WithNodesToProps, WrappedComponent);
};

export default withNodesToProps;
