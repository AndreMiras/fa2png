import React from 'react';
import {
  OverlayTrigger, InputGroup, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomInput from './CustomInput';
import IconPicker from './IconPicker';

const Append = ({ onChange, value }) => (
  <InputGroup.Append>
    <OverlayTrigger
      trigger="click"
      placement="right"
      rootClose
      overlay={IconPicker({ onChange })}
      scrollParent={{ scrollParent: true }}
    >
      <Button variant="outline-secondary">
        <FontAwesomeIcon icon={value} />
      </Button>
    </OverlayTrigger>
  </InputGroup.Append>
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
