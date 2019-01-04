/** @format **/
import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import { isFunction } from "carry-on-utils";
import State from "./State";

const getProp = (props, prop, param) => {
  let rslt;
  if (param === undefined) rslt = prop;
  else if (isFunction(param)) rslt = param(props);
  else rslt = param;
  return rslt;
};

const getSelect = (props, select) => {
  if (select) return state => select(state, props);
  if (props.select) return props.select;

  return undefined;
};

// a HOC that wraps the State component
export default ({
  select: hocSelect,
  from: hocFrom,
  path: hocPath,
  def: hocDef,
  debug: hocDebug,
  verbose: hocVerbose,
  ...rest
} = {}) => WrappedComponent => {
  const WithState = props => {
    const {
      path,
      from,
      default: def,
      select,
      debug,
      verbose,
      asProp,
      ...compProps
    } = props;
    const p = getProp(props, path, hocPath);
    const f = getProp(props, from, hocFrom);
    const d = getProp(props, def, hocDef);
    const s = getSelect(props, hocSelect);
    const compDebug = getProp(props, debug, hocDebug);
    const compVerbose = getProp(props, verbose, hocVerbose);

    // spreading state here will cause the watch index to mark all fields as accessed
    return (
      <State
        path={p}
        from={f}
        select={s}
        default={d}
        debug={compDebug}
        verbose={compVerbose}
        {...rest}
      >
        {state => {
          if (asProp)
            return <WrappedComponent {...compProps} {...{ [asProp]: state }} />;

          // fix String/Number/Boolean instanceof
          const val = state && state.valueOf();
          const type = typeof val;
          // spread object props, or deliver as "state" prop if it's not an object
          return type === "object" && !Array.isArray(state) ? (
            <WrappedComponent {...props} {...state} />
          ) : (
            <WrappedComponent {...props} state={state} />
          );
        }}
      </State>
    );
  };

  WithState.displayName = `withState(${WrappedComponent.displayName ||
    WrappedComponent.name})`;
  WithState.WrappedComponent = WrappedComponent;

  return hoistNonReactStatic(WithState, WrappedComponent);
};
