/** @format **/
import { mutateSetA, mutateMerge, toPath, getInA } from "carry-on-utils";
import createBrowserHistory from "history/createBrowserHistory";
import { createLocation } from "history";
import matchPath from "./matchPath";

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

const router = (history = createBrowserHistory(), path = "app.history") => {
  let isPaused = false;
  const historyPath = toPath(path);

  // router state
  const state = ({ get, set }) => {
    const prevHist = getInA(get(), history);
    if (prevHist !== undefined && prevHist.unlisten) prevHist.unlisten();

    const unlisten = history.listen(
      () =>
        !isPaused &&
        set(s => {
          const hist = getInA(s, historyPath);
          mutateMerge(hist, history);
          hist.match = matchPath(history.location.pathname, "/");
        }, "History Change")
    );

    // create an event handler for a link click
    const handleClick = ({ onClick, target, replace, to }) => event => {
      if (onClick) onClick(event);

      if (
        !event.defaultPrevented && // onClick prevented default
        event.button === 0 && // ignore everything but left clicks
        (!target || target === "_self") && // let browser handle "target=_blank" etc.
        !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
        event.preventDefault();

        const method = replace ? history.replace : history.push;

        method(to);
      }
    };

    // create an href based on the current location
    function getHref(to) {
      const hist = getInA(get(), historyPath);
      const location =
        typeof to === "string"
          ? createLocation(to, null, null, hist.location)
          : to;
      const href = location ? hist.createHref(location) : "";
      return href;
    }

    const stage = {
      unlisten,
      ...history,
      match: {
        path: "/",
        url: "/",
        params: {},
        isExact: history.location.pathname === "/"
      },
      handleClick,
      getHref,
      matchPath: opts => matchPath(get().app.history.location.pathname, opts)
    };

    return mutateSetA({}, historyPath, stage);
  };

  // router middleware
  const middleware = ({ get, next, isNested }) => (action, type, ...args) => {
    const nextState = next(action, type, ...args);
    if (isNested() || type !== "Time Travel") return nextState;

    // time travel should replace history location
    isPaused = true;
    const hist = getInA(get(), historyPath);
    hist.replace(hist.location);
    isPaused = false;

    return nextState;
  };

  return { state, middleware };
};

export default router;
