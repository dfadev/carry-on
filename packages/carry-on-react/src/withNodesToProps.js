/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";

const withNodesToProps = (nodeMap, WrappedComponent) => {
  const WithNodesToProps = ({ children, ...props }) => {
    if (!Array.isArray(children))
      return <WrappedComponent {...props}>{children}</WrappedComponent>;

    const newProps = {};

    for (let i = 0, len = children.length; i < len; i += 1) {
      const child = children[i];
      const name = child.type && child.type.name;
      const mapEntry = nodeMap[name];
      if (typeof mapEntry === "object") {
        const { prop, val, default: def, transform } = mapEntry;
        let v = child.props[val];
        if (v === undefined) v = def;
        newProps[prop] = transform ? transform(v) : v;
      } else newProps[nodeMap[name]] = child.props.children;
    }

    return <WrappedComponent {...props} {...newProps} />;
  };

  WithNodesToProps.displayName = "withNodesToProps";
  WithNodesToProps.WrappedComponent = WrappedComponent;

  return hoistNonReactStatic(WithNodesToProps, WrappedComponent);
};

export default withNodesToProps;
