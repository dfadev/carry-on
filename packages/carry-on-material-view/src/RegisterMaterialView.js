import React from "react";
import { Register } from "carry-on-react";
import { FormState } from "carry-on-react-forms";
import { materialViewComponents } from "./registerComponents";

const RegisterMaterialView = ({ ...rest }) => (
  <FormState id="RegisterMaterialView" {...rest}>
    <Register>{materialViewComponents}</Register>
  </FormState>
);

export default RegisterMaterialView;
