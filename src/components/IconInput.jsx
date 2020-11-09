import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomInput from './CustomInput';

const IconInput = ({ onChange, value }) => (
  <CustomInput onChange={onChange} prepend="Icon" value={value} append={<FontAwesomeIcon icon="paw" />} />
);
IconInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default IconInput;
