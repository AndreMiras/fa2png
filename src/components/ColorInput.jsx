import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import CustomInput from './CustomInput';

const CustomPopover = ({ onChange, value }) => (
  <Popover>
    <Popover.Title as="h3">Color</Popover.Title>
    <Popover.Content>
      <SketchPicker color={value.substring(1)} onChange={(color) => onChange(color.hex)} />
    </Popover.Content>
  </Popover>
);
CustomPopover.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const CustomOverlayTrigger = ({ onChange, value }) => (
  <OverlayTrigger
    trigger="click"
    placement="right"
    overlay={<CustomPopover onChange={onChange} value={value} />}
  >
    <FontAwesomeIcon icon="palette" />
  </OverlayTrigger>
);
CustomOverlayTrigger.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const ColorInput = ({ onChange, value }) => (
  <>
    <CustomInput
      onChange={onChange}
      prepend="Color"
      value={value}
      append={<CustomOverlayTrigger onChange={onChange} value={value} />}
    />
  </>
);
ColorInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default ColorInput;
