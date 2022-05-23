import React from "react";
import { withStyles } from "tss-react/mui";
import MaskedTextField from "./MaskedTextField";

const parseDigits = string => (string.match(/\d+/g) || []).join("");

const format = string => {
  if (string === undefined || string === null) return string;

  let digits = parseDigits(string).substr(0, 9);

  if (digits.length > 5) digits = `${digits.substr(0, 5)}-${digits.substr(5)}`;

  return digits;
};

const mask = zipCode => {
  if (zipCode === undefined || zipCode === null) return undefined;
  return zipCode.length > 10;
};

function ZipCodeField(props) {
  return <MaskedTextField mask={mask} format={format} {...(props || {})} />;
}

const StyledZipCodeField = withStyles(
  ZipCodeField,
  {},
  { name: "CoZipCodeField" }
);

export default StyledZipCodeField;
