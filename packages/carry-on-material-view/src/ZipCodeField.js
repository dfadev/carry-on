import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
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

const ZipCodeField = withStyles(
  {},
  { name: "CoZipCodeField" }
)(props => <MaskedTextField mask={mask} format={format} {...(props || {})} />);

export default ZipCodeField;
