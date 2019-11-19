/** @format **/
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { carryOn } from "carry-on-react";
import { getIn } from "carry-on-utils";

const Routes = carryOn(
  { id: "Routes" },
  ({ routes, history = "app.history", ...rest }, state) => {
    const hist = getIn(state, history);
    let routeList; // = getIn(state, routes);
    if (routes === undefined) {
      routeList = getIn(state, "routes");
      if (routeList === undefined) routeList = getIn(state, "site.routes");
      if (routeList === undefined) routeList = getIn(state, "app.routes");
    } else routeList = getIn(state, routes);

    let found;
    for (let i = 0, len = routeList.length; i < len; i++) {
      const entry = routeList[i];
      if (entry !== undefined) {
        if (entry.route === undefined) {
          found = { entry };
          break;
        }

        const match = entry.route && hist.matchPath(entry.route);
        if (match !== null) {
          found = { entry, match };
          break;
        }
      }
    }

    if (found === undefined) return null;
    const {
      entry: { component: Component },
      match
    } = found;
    return <Component match={match} {...rest} />;
  }
);

export default Routes;
