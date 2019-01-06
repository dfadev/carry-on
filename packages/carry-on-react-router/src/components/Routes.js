/** @format **/
import React from "react";
import { carryOn } from "carry-on-react";
import { getIn } from "carry-on-utils";

const Routes = carryOn(
  { id: "RouteMap" },
  ({ routes, history = "app.history", ...rest }, state) => {
    const hist = getIn(state, history);
    const routeList = getIn(state, routes);
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
