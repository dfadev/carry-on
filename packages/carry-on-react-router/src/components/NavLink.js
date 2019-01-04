import React from "react";
import Route from "./Route";

import Link from "./Link";

function joinClassnames(...classnames) {
  return classnames.filter(i => i).join(" ");
}

/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
function NavLink({
  debug,
  verbose,
  from,
  history,
  "aria-current": ariaCurrent = "page",
  activeClassName = "active",
  activeStyle,
  className: classNameProp,
  exact,
  isActive: isActiveProp,
  location: loc,
  strict,
  style: styleProp,
  to,
  ...rest
}) {
  const path = typeof to === "object" ? to.pathname : to;

  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

  return (
    <Route
      id="NavLink"
      from={from}
      debug={debug}
      verbose={verbose}
      history={history}
      path={escapedPath}
      exact={exact}
      strict={strict}
      location={loc}
    >
      {({ location, match }) => {
        const isActive = !!(isActiveProp
          ? isActiveProp(match, location)
          : match);

        const className = isActive
          ? joinClassnames(classNameProp, activeClassName)
          : classNameProp;
        const style = isActive ? { ...styleProp, ...activeStyle } : styleProp;

        return (
          <Link
            from={from}
            debug={debug}
            verbose={verbose}
            history={history}
            aria-current={(isActive && ariaCurrent) || null}
            className={className}
            style={style}
            to={to}
            {...rest}
          />
        );
      }}
    </Route>
  );
}

export default NavLink;
