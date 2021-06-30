import React, { useMemo } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { AsYouType } from "libphonenumber-js";
import MaskedTextField from "./MaskedTextField";

const accept = /\d|\+/g;

const PhoneField = withStyles(
  {},
  { name: "CoPhoneField" }
)(({ defaultCountry = "US", defaultCallingCode, ...props }) => {
  const format = useMemo(() => {
    const asYouType = new AsYouType({ defaultCountry, defaultCallingCode });
    return string => {
      asYouType.reset();
      const result = asYouType.input(string);
      return result;
    };
  }, [defaultCountry, defaultCallingCode]);

  return <MaskedTextField accept={accept} format={format} {...(props || {})} />;
});

export default PhoneField;
