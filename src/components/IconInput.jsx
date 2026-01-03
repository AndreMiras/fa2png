import React from 'react';
import {
  OverlayTrigger, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomInput from './CustomInput';
import IconPicker from './IconPicker';

const renderOverlay = ({ onChange }) => (
  <IconPicker onChange={onChange} />
);

const Append = ({ onChange, value }) => (
  <OverlayTrigger
    trigger="click"
    placement="right"
    transition={false}
    rootClose
    overlay={renderOverlay({ onChange })}
  >
    <Button variant="outline-secondary">
      <FontAwesomeIcon icon={value} />
    </Button>
  </OverlayTrigger>
);
Append.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const IconInput = ({ onChange, value }) => (
  <CustomInput
    onChange={onChange}
    prepend="Icon"
    value={value}
    append={<Append onChange={onChange} value={value} />}
  />
);
IconInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default IconInput;
