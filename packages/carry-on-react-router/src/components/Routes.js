import React from "react";
import { State } from "carry-on-react";
import { getIn } from "carry-on-utils";

function Routes({ routes, history = "app.history", ...rest }) {
  return (
    <State id="Routes">
      {state => {
        const hist = getIn(state, history);
        let routeList;
        if (routes === undefined) {
          routeList = getIn(state, "routes");
          if (routeList === undefined) routeList = getIn(state, "site.routes");
          if (routeList === undefined) routeList = getIn(state, "app.routes");
        } else routeList = getIn(state, routes);

        let found;
        for (let i = 0, len = routeList.length; i < len; i += 1) {
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
      }}
    </State>
  );
}

export default Routes;
