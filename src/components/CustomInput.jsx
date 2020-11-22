import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputGroup } from 'react-bootstrap';

const Append = ({ children }) => (
  <InputGroup.Append>
    <InputGroup.Text>
      {children}
    </InputGroup.Text>
  </InputGroup.Append>
);
Append.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};

const CustomInput = ({
  onChange, prepend, value, append, appendText,
}) => (
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text>{prepend}</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl aria-label="icon" value={value} onChange={(e) => onChange(e.target.value)} />
    {append == null ? <Append>{appendText}</Append> : append}
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
CustomInput.defaultProps = {
  append: null,
  appendText: null,
};

export default CustomInput;
