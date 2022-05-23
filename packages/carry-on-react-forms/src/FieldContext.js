import React, { createContext, useMemo } from "react";

const FieldContext = createContext();
FieldContext.displayName = "FieldContext";

export function MemoizedFieldContextProvider({ prefix, children }) {
  const value = useMemo(() => ({ prefix }), [prefix]);
  return (
    <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
  );
}

export default FieldContext;
