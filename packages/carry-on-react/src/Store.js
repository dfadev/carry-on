/** @format **/
import React, { Component } from "react";
import { isFunction } from "./utils";

// create an object with Store and withState components
export default function makeStoreComponents({
  useStore,
  deleteStore,
  connect
}) {
  // a Component that manages state
  class Store extends Component {
    state = connect({
      ...this.props,
      publish: nextState => this.setState(nextState),
      Context: React.createContext({})
    });

    // unmount failsafe to prevent setState calls after unmounting
    componentWillUnmount = () => deleteStore(this.props.id);

    // render the Provider and it's children
    render = () => {
      const { Provider } = useStore(this.props.id).Context;
      return <Provider value={this.state}>{this.props.children}</Provider>;
    };
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
    return WithStore;
  };

  return { Store, withStore };
}
