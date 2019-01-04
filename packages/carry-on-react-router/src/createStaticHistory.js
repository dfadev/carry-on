import { createLocation, createPath } from "history";

function addLeadingSlash(path) {
  return path.charAt(0) === "/" ? path : "/" + path;
}

function addBasename(basename, location) {
  if (!basename) return location;

  return {
    ...location,
    pathname: addLeadingSlash(basename) + location.pathname
  };
}

function stripBasename(basename, location) {
  if (!basename) return location;

  const base = addLeadingSlash(basename);

  if (location.pathname.indexOf(base) !== 0) return location;

  return {
    ...location,
    pathname: location.pathname.substr(base.length)
  };
}

function createURL(location) {
  return typeof location === "string" ? location : createPath(location);
}

function staticHandler(methodName) {
  return () => {
    throw new Error(`You cannot ${methodName} with a static router`);
  };
}

function noop() {}

/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */
export default function createStaticHistory(props = {}) {
  const staticContext = props.context || {};

  const navigateTo = (location, action) => {
    const { basename = "" } = props;
    staticContext.action = action;
    staticContext.location = addBasename(basename, createLocation(location));
    staticContext.url = createURL(staticContext.location);
  };

  const handlePush = location => navigateTo(location, "PUSH");
  const handleReplace = location => navigateTo(location, "REPLACE");
  const handleListen = () => noop;
  const handleBlock = () => noop;

  const { basename = "", location = "/" } = props;

  const history = {
    createHref: path => addLeadingSlash(basename + createURL(path)),
    action: "POP",
    location: stripBasename(basename, createLocation(location)),
    push: handlePush,
    replace: handleReplace,
    go: staticHandler("go"),
    goBack: staticHandler("goBack"),
    goForward: staticHandler("goForward"),
    listen: handleListen,
    block: handleBlock,
    staticContext
  };

  return history;
}
