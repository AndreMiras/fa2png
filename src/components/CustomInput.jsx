import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputGroup } from 'react-bootstrap';

const Append = ({ children }) => (
  <InputGroup.Text>
    {children}
  </InputGroup.Text>
);
Append.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};

const CustomInput = ({
  onChange,
  prepend,
  value,
  append = null,
  appendText = null,
}) => (
  <InputGroup className="mb-3">
    <InputGroup.Text>{prepend}</InputGroup.Text>
    <FormControl aria-label="icon" value={value} onChange={(e) => onChange(e.target.value)} />
    {append == null && appendText != null ? <Append>{appendText}</Append> : append}
  </InputGroup>
);
CustomInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  prepend: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
  value: PropTypes.string.isRequired,
  append: PropTypes.element,
  appendText: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
};

export default CustomInput;
