import React from "react";
import { carryOn } from "carry-on-react";
import { getIn } from "carry-on-utils";

const Link = carryOn(
  { id: "Link" },
  (
    {
      history = "app.history",
      innerRef,
      replace,
      to,
      onClick,
      target,
      ...rest
    },
    state
  ) => {
    const { handleClick, getHref } = getIn(state, history);

    return (
      <a
        {...rest}
        onClick={handleClick({ replace, to, onClick, target })}
        href={getHref(to)}
        ref={innerRef}
      />
    );
  }
);

export default Link;
