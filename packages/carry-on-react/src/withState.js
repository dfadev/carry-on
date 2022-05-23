import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import State from "./State";

// a HOC that wraps the State component
function withState(stateProps = {}) {
  return function OuterWithState(WrappedComponent) {
    function WithState(props) {
      return (
        // spreading state here will cause the watch index to mark all fields as accessed
        <State {...stateProps}>
          {state => {
            if (stateProps.asProp)
              return (
                <WrappedComponent
                  {...props}
                  {...{ [stateProps.asProp]: state }}
                />
              );

            // fix String/Number/Boolean instanceof
            const val = state && state.valueOf();
            const type = typeof val;
            // spread object props, or deliver as "state" prop if it's not an object
            if (type === "object" && !Array.isArray(state))
              return <WrappedComponent {...state} {...props} />;
            return <WrappedComponent state={state} {...props} />;
          }}
        </State>
      );
    }

    WithState.displayName = `withState(${
      WrappedComponent.displayName || WrappedComponent.name
    })`;
    WithState.WrappedComponent = WrappedComponent;

    return hoistNonReactStatic(WithState, WrappedComponent);
  };
}

export default withState;
