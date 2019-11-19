/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import hoistStatics from "hoist-non-react-statics";
import Route from "./Route";

function withRouter(Component) {
  const C = props => {
    const { wrappedComponentRef, ...remainingProps } = props;

    return (
      <Route>
        {routeComponentProps => (
          <Component
            {...remainingProps}
            {...routeComponentProps}
            ref={wrappedComponentRef}
          />
        )}
      </Route>
    );
  };

  C.displayName = `withRouter(${Component.displayName || Component.name})`;
  C.WrappedComponent = Component;

  return hoistStatics(C, Component);
}

export default withRouter;
