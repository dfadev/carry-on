import React from "react";
import {
  StylesProvider,
  createGenerateClassName
} from "@material-ui/core/styles";

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  productionPrefix: "CO",
  seed: "carryOn"
});

const Root = ({ children }) => (
  <StylesProvider generateClassName={generateClassName}>
    {children}
  </StylesProvider>
);

export default Root;
