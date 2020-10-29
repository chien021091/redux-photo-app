import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label } from "reactstrap";
import Select from "react-select";

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  options: PropTypes.array,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

SelectField.defaultProps = {
  options: [],
  label: "",
  placeholder: "",
  disabled: false,
};

function SelectField(props) {
  const { field, options, label, placeholder, disabled } = props;
  const { name, value } = field;

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelectedOptionsChange = (selectedOption) => {
    const selectValue = selectedOption ? selectedOption.value : selectedOption;
    const changeEvent = {
      target: {
        name,
        value: selectValue,
      },
    };

    field.onChange(changeEvent);
  };

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Select
        id={name}
        {...field}
        onChange={handleSelectedOptionsChange}
        value={selectedOption}
        name="categoryId"
        placeholder={placeholder}
        disabled={disabled}
        options={options}
      />
    </FormGroup>
  );
}

export default SelectField;
