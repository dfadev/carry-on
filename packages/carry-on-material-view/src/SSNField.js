import React from "react";
import { withStyles } from "tss-react/mui";
import MaskedTextField from "./MaskedTextField";

const parseDigits = string => (string.match(/\d+/g) || []).join("");

const format = string => {
  if (string === undefined || string === null) return string;

  let digits = parseDigits(string).substr(0, 9);

  if (digits.length > 3) digits = `${digits.substr(0, 3)}-${digits.substr(3)}`;
  if (digits.length > 6) digits = `${digits.substr(0, 6)}-${digits.substr(6)}`;

  return digits;
};

const mask = ssn => {
  if (ssn === undefined || ssn === null) return undefined;
  return ssn.length > 11;
};

function SSNField(props) {
  return <MaskedTextField mask={mask} format={format} {...(props || {})} />;
}

const StyledSSNField = withStyles(SSNField, {}, { name: "CoSSNField" });

export default StyledSSNField;
