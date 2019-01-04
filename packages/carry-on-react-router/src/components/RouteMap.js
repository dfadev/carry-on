/** @format **/
import React from "react";
import { carryOn } from "carry-on-react";
import { getIn } from "carry-on-utils";

const RouteMap = carryOn(
  { id: "RouteMap" },
  ({ routes, history = "app.history", ...rest }, state) => {
    const hist = getIn(state, history);
    const matches = Object.entries(getIn(state, routes))
      .map(([key, { route, component: Component }]) => ({
        key,
        route,
        Component,
        match: route && hist.matchPath(route)
      }))
      .filter(item => item.match !== null)
      .sort(
        item => (item.route === undefined || item.match === undefined ? 1 : -1)
      );

    if (matches.length === 0) return null;
    const { Component, match } = matches[0];
    return <Component match={match} {...rest} />;
  }
);

export default RouteMap;
