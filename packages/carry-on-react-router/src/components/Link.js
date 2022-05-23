import React from "react";
import { State } from "carry-on-react";
import { getIn } from "carry-on-utils";

function Link({
  history = "app.history",
  innerRef,
  replace,
  to,
  onClick,
  target,
  force,
  ...rest
}) {
  return (
    <State id="Link">
      {state => {
        const { handleClick, getHref } = getIn(state, history);

        /* eslint-disable jsx-a11y/anchor-has-content */
        return (
          <a
            {...rest}
            onClick={handleClick({ replace, to, onClick, target, force })}
            href={getHref(to)}
            ref={innerRef}
          />
        );
      }}
    </State>
  );
}

export default Link;
