import React from "react";

class Lifecycle extends React.Component {
  componentDidMount() {
    const { onMount } = this.props;
    if (onMount) onMount.call(this, this);
  }

  componentDidUpdate(prevProps) {
    const { onUpdate } = this.props;
    if (onUpdate) onUpdate.call(this, this, prevProps);
  }

  componentWillUnmount() {
    const { onUnmount } = this.props;
    if (onUnmount) onUnmount.call(this, this);
  }

  render() {
    return null;
  }
}

export default Lifecycle;
