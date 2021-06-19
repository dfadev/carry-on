import React from "react";
import hoistStatics from "hoist-non-react-statics";
import Route from "./Route";

function withRouter(Component) {
  const C = props => {
    const { wrappedComponentRef, from, store, ...remainingProps } = props;

    return (
      <Route from={from || store}>
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
