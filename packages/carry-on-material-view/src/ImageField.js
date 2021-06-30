import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field } from "carry-on-react-forms";
import getFieldStatus from "./getFieldStatus";

const ImageField = withStyles(
  {
    fileInput: {
      opacity: 0,
      display: "none",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  },
  { name: "CoImageField" }
)(
  ({
    classes,
    name,
    label = name,
    disabled: disabledProp,
    value: valueProp,
    required,
    fullWidth,
    labelPlacement = "bottom",
    imgWidth,
    imgHeight,
    alt = "",
    readOnly,
    ...props
  }) => {
    const fileInput = useRef(null);

    return (
      <Field path={name} type="image" readOnly={readOnly}>
        {(field, store) => {
          const { error, hasError, disabled, value } = getFieldStatus(
            field,
            store,
            valueProp,
            disabledProp
          );

          const { setValue } = field;

          const onInputChange = e => {
            if (field.readOnly) return;
            const f = e.target.files[0];
            const reader = new FileReader();
            reader.onload = evt => {
              // danger?
              setValue(evt.target.result);
            };
            reader.readAsDataURL(f);
          };

          return (
            <FormControl
              error={hasError}
              required={required}
              fullWidth={fullWidth}
            >
              <FormControlLabel
                labelPlacement={labelPlacement}
                component="label"
                control={
                  <>
                    {!disabled && !field.readOnly && (
                      <input
                        ref={fileInput}
                        className={classes.fileInput}
                        type="file"
                        onChange={onInputChange}
                      />
                    )}
                    <Button
                      {...props}
                      onClick={() => {
                        if (!disabled && !field.readOnly)
                          fileInput.current.click();
                      }}
                    >
                      <img
                        width={imgWidth}
                        height={imgHeight}
                        src={value}
                        alt={alt}
                      />
                    </Button>
                  </>
                }
                label={label}
                disabled={disabled}
              />
              {hasError && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
          );
        }}
      </Field>
    );
  }
);

export default ImageField;
