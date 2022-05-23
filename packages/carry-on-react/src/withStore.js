import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import StoreContext from "./StoreContext";

function withStore(WrappedComponent) {
  function WithStore({ from: propsFrom, ...props }) {
    return (
      <StoreContext.Consumer>
        {providerFrom => (
          <WrappedComponent {...props} from={propsFrom || providerFrom} />
        )}
      </StoreContext.Consumer>
    );
  }

  WithStore.displayName = `withStore(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;
  WithStore.WrappedComponent = WrappedComponent;

  return hoistNonReactStatic(WithStore, WrappedComponent);
}

export default withStore;
