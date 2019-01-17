import React from "react";
import StoreContext from "./StoreContext";

const Store = ({ id, children = null }) => (
  <StoreContext.Provider value={id}>{children}</StoreContext.Provider>
);

export default Store;
