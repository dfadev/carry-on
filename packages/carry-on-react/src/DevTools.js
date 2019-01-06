import { Component } from "react";
import { register, devTools } from "carry-on-store";

let hasRegistered = false;

export default class DevTools extends Component {
  constructor(props) {
    super(props);
    if (hasRegistered) return;
    hasRegistered = true;
    register(devTools(), props.store);
  }

  render() {
    return this.props.children || null;
  }
}
