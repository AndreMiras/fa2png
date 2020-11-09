import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomInput from './CustomInput';

const ColorInput = ({ onChange, value }) => (
  <>
    <CustomInput
      onChange={onChange}
      prepend="Color"
      value={value}
      append={<FontAwesomeIcon icon="palette" />}
    />
    <SketchPicker color={value.substring(1)} onChange={(color) => onChange(color.hex)} />
  </>
);
ColorInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default ColorInput;
