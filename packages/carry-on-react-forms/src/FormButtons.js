/** @format **/
import React from "react";
import { State } from "carry-on-react";

export default ({ store, form = "form", children }) => (
  <State
    select={({ submit, reset, isPristine, isValidating, isValid }) => ({
      submit,
      reset,
      disableSubmit: isPristine || isValidating || !isValid,
      disableReset: isPristine || isValidating
    })}
    from={store}
    path={form}
  >
    {({ submit, reset, disableSubmit, disableReset }) =>
      children({
        submit: {
          onClick: submit,
          disabled: disableSubmit
        },
        reset: {
          onClick: reset,
          disabled: disableReset
        }
      })
    }
  </State>
);
