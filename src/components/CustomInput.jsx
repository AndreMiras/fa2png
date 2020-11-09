import React from 'react';
import './ConfigureIcon.css';
import 'rc-slider/assets/index.css';
import PropTypes from 'prop-types';
import { FormControl, InputGroup } from 'react-bootstrap';

const CustomInput = ({
  onChange, prepend, value, append,
}) => (
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text>{prepend}</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl aria-label="icon" value={value} onChange={(e) => onChange(e.target.value)} />
    <InputGroup.Append>
      <InputGroup.Text>
        {append}
      </InputGroup.Text>
    </InputGroup.Append>
  </InputGroup>
);
CustomInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  prepend: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
  value: PropTypes.string.isRequired,
  append: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};

export default CustomInput;
