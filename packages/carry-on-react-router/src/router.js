import { mutateSetA, mutateMerge, toPath, getInA } from "carry-on-utils";
import { createLocation, createBrowserHistory } from "history";
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

    const unlisten =
      history.listen &&
      history.listen(
        () =>
          !isPaused &&
          set(s => {
            const hist = getInA(s, historyPath);
            mutateMerge(hist, history);
          }, "History Change")
      );

    // create an event handler for a link click
    const handleClick =
      ({ onClick, target, replace, to, force }) =>
      event => {
        if (onClick) onClick(event);

        if (
          !event.defaultPrevented && // onClick prevented default
          event.button === 0 && // ignore everything but left clicks
          (!target || target === "_self") && // let browser handle "target=_blank" etc.
          !isModifiedEvent(event) // ignore clicks with modifier keys
        ) {
          event.preventDefault();

          const method = replace ? history.replace : history.push;

          if (force) window.location = to;
          else method(to);
        }
      };

    // create an href based on the current location
    function getHref(to) {
      const hist = getInA(get(), historyPath);
      let location = to;
      if (typeof to === "string") {
        if (to.charAt(0) !== "/") {
          location = createLocation(to, null, null, hist.location);
        } else {
          location = createLocation(to);
        }
      }
      const href = location ? hist.createHref(location) : "";
      return href;
    }

    const stage = {
      unlisten,
      ...history,
      entries: history.entries ? history.entries.slice() : [],
      location: { ...history.location },

      match: {
        path: "/",
        url: "/",
        params: {},
        isExact: history.location && history.location.pathname === "/"
      },
      handleClick,
      getHref,
      matchPath: opts =>
        matchPath(getInA(get(), historyPath).location.pathname, opts)
    };

    if (history.staticContext) {
      const setContext = cs => {
        set(s => {
          const hist = getInA(s, historyPath);
          hist.staticContext = cs(hist);
        }, "History Change");
      };

      stage.push = stage.push(setContext);
      stage.replace = stage.replace(setContext);
    }

    return mutateSetA({}, historyPath, stage);
  };

  // router middleware
  const middleware =
    ({ get, next, isNested }) =>
    (action, opts) => {
      const nextState = next(action, opts);
      const type = opts && (opts.type || opts);
      if (isNested() || type !== "Time Travel") return nextState;

      // time travel should replace history location
      isPaused = true;
      const hist = getInA(get(), historyPath);
      if (
        window.location.pathname !== hist.location.pathname ||
        window.location.search !== hist.location.search ||
        window.location.hash !== hist.location.hash
      )
        hist.replace(hist.location);
      isPaused = false;

      return nextState;
    };

  return { state, middleware };
};

export default router;
