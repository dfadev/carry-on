import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { withStyles } from "tss-react/mui";
import MaskedTextField from "./MaskedTextField";

const numberAccept = /[\d.]+/g;

const parseNumber = string => {
  if (typeof string !== "string") string = string.toString();
  return (string.match(numberAccept) || []).join("");
};

const formatFloatingPointNumber = (value, maxDigits) => {
  const parsed = parseNumber(value.slice(0, 15));
  const [head, tail] = parsed.split(".");
  // Avoid rounding errors at toLocaleString as when user enters 1.239 and maxDigits=2 we
  // must not to convert it to 1.24, it must stay 1.23
  const scaledTail = tail != null ? tail.slice(0, maxDigits) : "";

  const number = Number.parseFloat(`${head}.${scaledTail}`);

  if (Number.isNaN(number)) {
    return "";
  }

  const formatted = number.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDigits,
    useGrouping: false
  });

  if (parsed.includes(".")) {
    const [formattedHead] = formatted.split(".");

    // skip zero at digits position for non fixed floats
    // as at digits 2 for non fixed floats numbers like 1.50 has no sense, just 1.5 allowed
    // but 1.0 has sense as otherwise you will not be able to enter 1.05 for example
    const formattedTail =
      scaledTail !== "" &&
      scaledTail.length < maxDigits &&
      scaledTail[maxDigits] === "0"
        ? scaledTail.slice(0, -1)
        : scaledTail;

    return maxDigits === 0
      ? formattedHead
      : `${formattedHead}.${formattedTail}`;
  }
  return formatted;
};

const format = maxDigits => string =>
  formatFloatingPointNumber(string, maxDigits);

const accept = /[\d.$]/g;

function PercentageField({
  InputProps,
  maximumFractionDigits = 2,
  symbol = "%",
  ...props
}) {
  return (
    <MaskedTextField
      accept={accept}
      format={format(maximumFractionDigits)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{symbol}</InputAdornment>
        ),
        ...(InputProps || {})
      }}
      {...(props || {})}
    />
  );
}

const StyledPercentageField = withStyles(
  PercentageField,
  {},
  { name: "CoPercentageField" }
);

export default StyledPercentageField;
