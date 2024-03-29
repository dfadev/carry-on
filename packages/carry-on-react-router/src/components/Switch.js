import React from "react";
import { State } from "carry-on-react";
import { getIn } from "carry-on-utils";
import matchPath from "../matchPath";

function Switch({ location: loc, children, history = "app.history" }) {
  return (
    <State id="Switch">
      {state => {
        const hist = getIn(state, history);
        const location = loc || hist.location;

        let element;
        let match;

        React.Children.forEach(children, child => {
          if (match == null && React.isValidElement(child)) {
            element = child;
            match = child.props.path
              ? matchPath(location.pathname, { ...child.props })
              : hist.match;
          }
        });

        return match
          ? React.cloneElement(element, { location, computedMatch: match })
          : null;
      }}
    </State>
  );
}

export default Switch;
