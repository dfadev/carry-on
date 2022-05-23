import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";

function nodesToProps(WrappedComponent, children) {
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
}

function withNodesToProps(WrappedComponent) {
  function WithNodesToProps({ children, ...props }) {
    if (!Array.isArray(children) && typeof children === "function")
      return <WrappedComponent {...props}>{children}</WrappedComponent>;
    return (
      <WrappedComponent
        {...props}
        {...nodesToProps(WrappedComponent, children)}
      />
    );
  }

  WithNodesToProps.displayName = `withNodesToProps(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  WithNodesToProps.WrappedComponent = WrappedComponent;

  return hoistNonReactStatic(WithNodesToProps, WrappedComponent);
}

export default withNodesToProps;
