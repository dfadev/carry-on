import React from "react";
import { createLocation, locationsAreEqual } from "history";
import { carryOn } from "carry-on-react";
import { getIn } from "carry-on-utils";

import Lifecycle from "./Lifecycle";
import generatePath from "../generatePath";

const Redirect = carryOn(
  { id: "Redirect" },
  ({ history = "app.history", computedMatch, to, push = false }, state) => {
    const hist = getIn(state, history);
    const method = push ? hist.push : hist.replace;

    /* eslint-disable no-nested-ternary */
    const location = createLocation(
      computedMatch
        ? typeof to === "string"
          ? generatePath(to, computedMatch.params)
          : {
              ...to,
              pathname: generatePath(to.pathname, computedMatch.params)
            }
        : to
    );

    // When rendering in a static context, set the new location immediately.
    if (hist.staticContext) {
      method(location);
      return null;
    }

    return (
      <Lifecycle
        onMount={() => {
          method(location);
        }}
        onUpdate={(_, prevProps) => {
          if (!locationsAreEqual(prevProps.to, location)) {
            method(location);
          }
        }}
        to={to}
      />
    );
  }
);

export default Redirect;
