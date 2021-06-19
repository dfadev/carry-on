import React from "react";
import { Field } from "carry-on-react-forms";

const GenericInputField = ({ tooltip, name, label }) => (
  <Field path={name}>
    {({ element }) => (
      <div>
        <div>
          <label htmlFor={element.id}>{label}</label>
        </div>
        <div>
          <input {...element} />
        </div>
        {tooltip && typeof tooltip === "function" ? tooltip() : tooltip}
        <br />
      </div>
    )}
  </Field>
);

export default GenericInputField;
