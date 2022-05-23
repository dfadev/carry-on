import React from "react";
import StoreContext from "./StoreContext";

function Store({ id, children = null }) {
  return <StoreContext.Provider value={id}>{children}</StoreContext.Provider>;
}

export default Store;
