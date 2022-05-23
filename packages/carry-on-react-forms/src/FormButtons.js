/* eslint-disable react/jsx-curly-newline */
import React from "react";
import FormState from "./FormState";

export default function FormButtons({ children = () => null, ...rest }) {
  return (
    <FormState {...rest}>
      {({ submit, reset, isPristine, isValidating, isValid } = {}) =>
        children({
          submit: {
            onClick: submit,
            disabled: isPristine || isValidating || !isValid
          },
          reset: {
            onClick: reset,
            disabled: isPristine || isValidating
          }
        })
      }
    </FormState>
  );
}
