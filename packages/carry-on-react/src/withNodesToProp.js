import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";

const withNodesToProp = propName => WrappedComponent => {
  const WithNodesToProp = ({ children, ...props }) =>
    children ? (
      <WrappedComponent {...{ ...props, [propName]: children }} />
    ) : (
      <WrappedComponent {...props} />
    );

  WithNodesToProp.displayName = "withNodesToProp";
  WithNodesToProp.WrappedComponent = WrappedComponent;

  return hoistNonReactStatic(WithNodesToProp, WrappedComponent);
};

export default withNodesToProp;
