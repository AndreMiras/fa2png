import React from 'react';
import PropTypes from 'prop-types';
import { HexColorPicker } from 'react-colorful';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  OverlayTrigger, Popover, Button,
} from 'react-bootstrap';
import CustomInput from './CustomInput';

const customPopover = (onChange, value) => (
  <Popover>
    <Popover.Header as="h3">Color</Popover.Header>
    <Popover.Body>
      <HexColorPicker color={value} onChange={onChange} />
    </Popover.Body>
  </Popover>
);

const Append = ({ onChange, value }) => (
  <OverlayTrigger
    trigger="click"
    placement="right"
    transition={false}
    rootClose
    overlay={customPopover(onChange, value)}
  >
    <Button variant="outline-secondary">
      <FontAwesomeIcon icon="palette" />
    </Button>
  </OverlayTrigger>
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
