/** @format **/
import React from "react";
import { State } from "carry-on-react";

export default ({ store, form = "form", children, ...rest }) => (
  <State from={store} path={form} {...rest}>
    {({ submit, reset, isPristine, isValidating, isValid }) =>
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
  </State>
);
