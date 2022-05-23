import React from "react";
import { withStyles } from "tss-react/mui";
import MaskedTextField from "./MaskedTextField";

const parseDigits = string => (string.match(/\d+/g) || []).join("");

const format = string => {
  if (string === undefined || string === null) return string;

  let digits = parseDigits(string).substr(0, 9);

  if (digits.length > 2) digits = `${digits.substr(0, 2)}-${digits.substr(2)}`;

  return digits;
};

const mask = ein => {
  if (ein === undefined || ein === null) return undefined;
  return ein.length > 10;
};

function EINField(props) {
  return <MaskedTextField mask={mask} format={format} {...(props || {})} />;
}

const StyledEINField = withStyles(EINField, {}, { name: "CoEINField" });

export default StyledEINField;
