import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";

function withNodesToProp(propName) {
  return function inner(WrappedComponent) {
    function WithNodesToProp({ children, ...props }) {
      if (children)
        return <WrappedComponent {...{ ...props, [propName]: children }} />;
      return <WrappedComponent {...props} />;
    }

    WithNodesToProp.displayName = `withNodesToProp(${
      WrappedComponent.displayName || WrappedComponent.name
    })`;
    WithNodesToProp.WrappedComponent = WrappedComponent;

    return hoistNonReactStatic(WithNodesToProp, WrappedComponent);
  };
}

export default withNodesToProp;
