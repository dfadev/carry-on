import { Component } from "react";
import { register, devTools } from "carry-on-store";

export default class DevTools extends Component {
  constructor(props) {
    super(props);
    register(devTools(), props.store);
  }

  render() {
    return this.props.children || null;
  }
}
