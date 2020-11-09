import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomInput from './CustomInput';

const ColorInput = ({ onChange, value }) => (
  <CustomInput onChange={onChange} prepend="Color" value={value} append={<FontAwesomeIcon icon="palette" />} />
);
ColorInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default ColorInput;
