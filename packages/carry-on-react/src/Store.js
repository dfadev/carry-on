/** @format **/
import React, { Component } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import { isFunction } from "./utils";

// create an object with Store and withState components
export default function makeStoreComponents({
  deleteStore,
  connect
}) {
  // a Component that manages state
  class Store extends Component {
    constructor(props) {
      super(props);
      connect({ ...this.props });
    }

    shouldComponentUpdate = () => false;

    componentWillUnmount = () => deleteStore(this.props.id);

    render = () => this.props.children;
  }

  // a HOC that wraps the Store component
  const withStore = (opts = {}) => WrappedComponent => {
    const WithStore = props => (
      <Store
        id={opts.id}
        init={isFunction(opts.init) ? opts.init(props) : opts.init}
        producer={opts.producer}
        plugins={opts.plugins}
      >
        <WrappedComponent {...props} />
      </Store>
    );
    WithStore.displayName = `withStore(${WrappedComponent.displayName || WrappedComponent.name})`;
    WithStore.WrappedComponent = WrappedComponent;

    return hoistNonReactStatic(WithStore, WrappedComponent);
  };

  return { Store, withStore };
}
