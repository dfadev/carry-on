import React from "react";
import { carryOn } from "carry-on-react";
import { getIn } from "carry-on-utils";

function isEmptyChildren(children) {
  return React.Children.count(children) === 0;
}

const Route = carryOn((props, state) => {
  const {
    history = "app.history",
    location: loc,
    computedMatch,
    path,
    children: childs,
    component,
    render
  } = props;

  const hist = getIn(state, history);
  const location = loc || hist.location;

  let match;
  if (computedMatch) match = computedMatch;
  else if (path) match = hist.matchPath(props);
  //else match = hist.match; // ???

  const renderProps = { location, match };

  let children = childs;
  if (Array.isArray(children) && children.length === 0)
    children = null;

  if (typeof children === "function") {
    children = children(renderProps);
    if (children === undefined) children = null;
  }

  if (children && !isEmptyChildren(children)) return children;
  if (match)
    if (component) return React.createElement(component, renderProps);
    else if (render) return render(renderProps);

  return null;
});

Route.displayName = "Route";

export default Route;
