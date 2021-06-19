import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";

const nodesToProps = (WrappedComponent, children) => {
  const childs = Array.isArray(children) ? children : [children];

  const newProperties = {};

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

    const composes = WrappedComponent.composes || [];

    if (prop === undefined || !composes.includes(prop)) {
      if (!newProperties.children) newProperties.children = [];
      newProperties.children.push(child);
    } else {
      // retrieve value
      let v = child.props && child.props[val];

      // default value
      if (v === undefined) v = def;

      // transform value
      v = transform ? transform(v, child.props) : v;

      // present as array when multiple nodes
      const currentPropertyValue = newProperties[prop];
      if (currentPropertyValue === undefined) newProperties[prop] = v;
      else if (Array.isArray(currentPropertyValue))
        currentPropertyValue.push(v);
      else newProperties[prop] = [currentPropertyValue, v];
    }
  }

  return newProperties;
};

const withNodesToProps = WrappedComponent => {
  const WithNodesToProps = ({ children, ...props }) =>
    !Array.isArray(children) && typeof children === "function" ? (
      <WrappedComponent {...props}>{children}</WrappedComponent>
    ) : (
      <WrappedComponent
        {...props}
        {...nodesToProps(WrappedComponent, children)}
      />
    );

  WithNodesToProps.displayName = "withNodesToProps";
  WithNodesToProps.WrappedComponent = WrappedComponent;

  return hoistNonReactStatic(WithNodesToProps, WrappedComponent);
};

export default withNodesToProps;
