/** @format **/
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-newline */
import React from "react";
import { State } from "carry-on-react";
import FormContext from "./FormContext";

export default ({
  store: propStore,
  form: propForm = "form",
  children = () => null,
  ...rest
}) => (
  <FormContext.Consumer>
    {({ store, form } = { store: propStore, form: propForm }) => (
      <State from={store} path={form} {...rest}>
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
      </State>
    )}
  </FormContext.Consumer>
);
