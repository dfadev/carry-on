import React, { useMemo } from "react";
import { withStyles } from "tss-react/mui";
import { AsYouType } from "libphonenumber-js";
import MaskedTextField from "./MaskedTextField";

const accept = /\d|\+/g;

function PhoneField({ defaultCountry = "US", defaultCallingCode, ...props }) {
  const format = useMemo(() => {
    const asYouType = new AsYouType({ defaultCountry, defaultCallingCode });
    return string => {
      asYouType.reset();
      const result = asYouType.input(string);
      return result;
    };
  }, [defaultCountry, defaultCallingCode]);

  return <MaskedTextField accept={accept} format={format} {...(props || {})} />;
}

const StyledPhoneField = withStyles(PhoneField, {}, { name: "CoPhoneField" });

export default StyledPhoneField;
