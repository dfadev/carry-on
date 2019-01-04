import React from "react";
import { carryOn } from "carry-on-react";
import { getIn } from "carry-on-utils";

const Link = carryOn({ id: "Link" }, (props, state) => {
  const {
    history = "app.history",
    innerRef,
    replace,
    to,
    onClick,
    target,
    ...rest
  } = props;
  const { handleClick, getHref } = getIn(state, history);

  return (
    <a
      {...rest}
      onClick={handleClick({ replace, to, onClick, target })}
      href={getHref(to)}
      ref={innerRef}
    />
  );
});

export default Link;
