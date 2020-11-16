import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { ErrorMessage } from "formik";
import { TextField } from "@material-ui/core";

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
};

function InputField(props) {
  const { field, form, type, label, placeholder, disabled, required } = props;
  const { name } = field;
  const {errors, touched} = form;
  const showError = errors[name] && touched[name];
  return (
    <FormGroup>
      {/* {label && <Label for={name}>{label}</Label>}
      <Input
        id={name}
        {...field}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        invalid={showError}
      /> */}
  
      <TextField
      id={name}
      {...field}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      invalid={showError}
      fullWidth
      label={label}
      required={required}
      />
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default InputField;
