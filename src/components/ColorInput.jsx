import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  OverlayTrigger, Popover, InputGroup, Button,
} from 'react-bootstrap';
import CustomInput from './CustomInput';

const customPopover = (onChange, value) => (
  <Popover>
    <Popover.Title as="h3">Color</Popover.Title>
    <Popover.Content>
      <SketchPicker color={value.substring(1)} onChange={(color) => onChange(color.hex)} />
    </Popover.Content>
  </Popover>
);

const Append = ({ onChange, value }) => (
  <InputGroup.Append>
    <OverlayTrigger
      trigger="click"
      placement="right"
      overlay={customPopover(onChange, value)}
    >
      <Button variant="outline-secondary">
        <FontAwesomeIcon icon="palette" />
      </Button>
    </OverlayTrigger>
  </InputGroup.Append>
);
Append.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const ColorInput = ({ onChange, value }) => (
  <CustomInput
    onChange={onChange}
    prepend="Color"
    value={value}
    append={<Append onChange={onChange} value={value} />}
  />
);
ColorInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default ColorInput;
