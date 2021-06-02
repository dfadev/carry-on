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
        v = transform ? transform(v) : v;
        const curProp = newProps[prop];
        if (curProp !== undefined) {
          if (Array.isArray(curProp)) {
            curProp.push(v);
          } else {
            newProps[prop] = [curProp, v];
          }
        } else newProps[prop] = v;
      } else {
        const v = child.props.children;
        const curProp = newProps[nodeMap[name]];
        if (curProp !== undefined) {
          if (Array.isArray(curProp)) {
            curProp.push(v);
          } else {
            newProps[nodeMap[name]] = [curProp, v];
          }
        } else newProps[nodeMap[name]] = child.props.children;
      }
    }

    return <WrappedComponent {...props} {...newProps} />;
  };

  WithNodesToProps.displayName = "withNodesToProps";
  WithNodesToProps.WrappedComponent = WrappedComponent;

  return hoistNonReactStatic(WithNodesToProps, WrappedComponent);
};

export default withNodesToProps;
