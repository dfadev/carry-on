import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import StoreContext from "./StoreContext";

const withStore = WrappedComponent => {
  const WithStore = props => (
    <StoreContext.Consumer>
      {from => <WrappedComponent {...props} from={props.from || from} />}
    </StoreContext.Consumer>
  );

  WithStore.displayName = "withStore";
  WithStore.WrappedComponent = WrappedComponent;

  return hoistNonReactStatic(WithStore, WrappedComponent);
};

export default withStore;
