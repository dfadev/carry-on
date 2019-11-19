/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { carryOn } from "carry-on-react";
import { getIn } from "carry-on-utils";

function joinClassnames(...classnames) {
  return classnames.filter(i => i).join(" ");
}

const escapedRE = /([.+*?=^!:${}()[\]|/\\])/g;

const NavLink = carryOn(
  { id: "NavLink" },
  (
    {
      history = "app.history",
      "aria-current": ariaCurrent = "page",
      activeClassName = "active",
      activeStyle,
      className: classNameProp,
      exact,
      isActive: isActiveProp,
      location: loc,
      style: styleProp,
      strict,
      sensitive,
      to,
      replace,
      onClick,
      target,
      innerRef,
      ...rest
    },
    state
  ) => {
    const hist = getIn(state, history),
      location = loc || hist.location,
      path = typeof to === "object" ? to.pathname : to,
      escapedPath = path && path.replace(escapedRE, "\\$1"),
      match = hist.matchPath({
        path: escapedPath,
        exact,
        strict,
        sensitive
      }),
      isActive = !!(isActiveProp ? isActiveProp(match, location) : match),
      className = isActive
        ? joinClassnames(classNameProp, activeClassName)
        : classNameProp,
      style = isActive ? { ...styleProp, ...activeStyle } : styleProp,
      { handleClick, getHref } = hist;

    return (
      <a
        {...rest}
        onClick={handleClick({ replace, to, onClick, target })}
        href={getHref(to)}
        ref={innerRef}
        style={style}
        className={className}
        aria-current={(isActive && ariaCurrent) || null}
      />
    );
  }
);

export default NavLink;
