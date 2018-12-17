/** @format **/
import React, { Component } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import { isFunction } from "./utils";

// create an object with Store and withState components
export default function makeStoreComponents({
  useStore,
  deleteStore,
  connect
}) {
  // a Component that manages state
  class ContextStore extends Component {
    state = connect({
      ...this.props,
      publish: nextState => this.setState(nextState),
      Context: React.createContext({})
    });

    shouldComponentUpdate = (nextProps, nextState) => this.state !== nextState;

    // unmount failsafe to prevent setState calls after unmounting
    componentWillUnmount = () => deleteStore(this.props.id);

    // render the Provider and it's children
    render = () => {
      const { Provider } = useStore(this.props.id).Context;
      return <Provider value={this.state}>{this.props.children}</Provider>;
    };
  }

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
    return hoistNonReactStatic(WithStore, WrappedComponent);
  };

  // a HOC that wraps the ContextStore component
  const withContextStore = (opts = {}) => WrappedComponent => {
    const WithContextStore = props => (
      <ContextStore
        id={opts.id}
        init={isFunction(opts.init) ? opts.init(props) : opts.init}
        producer={opts.producer}
        plugins={opts.plugins}
      >
        <WrappedComponent {...props} />
      </ContextStore>
    );
    return hoistNonReactStatic(WithContextStore, WrappedComponent);
  };

  return { ContextStore, withContextStore, Store, withStore };
}
