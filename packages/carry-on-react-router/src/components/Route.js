import React from "react";
import { carryOn } from "carry-on-react";
import { getIn } from "carry-on-utils";
import RouterContext from "./RouterContext";

function isEmptyChildren(children) {
  return React.Children.count(children) === 0;
}

const Route = carryOn(
  { id: "Route" },
  (
    {
      history = "app.history",
      location: loc,
      computedMatch,
      path,
      children: childs,
      component,
      render,
      exact,
      strict,
      sensitive
    },
    state
  ) => {
    const hist = getIn(state, history);
    const location = loc || hist.location;

    let match;
    if (computedMatch) match = computedMatch;
    else if (path) match = hist.matchPath({ path, exact, strict, sensitive });
    else match = hist.match;

    return (
      <RouterContext.Consumer>
        {(context = {}) => {
          if (context.match !== undefined && !path) match = context.match;

          const renderProps = { ...context, location, match, history: hist };
          if (hist.staticContext)
            renderProps.staticContext = hist.staticContext;

          let children = childs;
          if (Array.isArray(children) && children.length === 0) children = null;
          else if (typeof children === "function") {
            children = children(renderProps);
            if (children === undefined) children = null;
          }

          let content = null;
          if (children && !isEmptyChildren(children)) content = children;
          else if (match) {
            if (component)
              content = React.createElement(component, renderProps);
            else if (render) content = render(renderProps);
          }

          return (
            <RouterContext.Provider value={renderProps}>
              {content}
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
);

Route.displayName = "Route";

export default Route;
