import React from 'react';
import './ConfigureIcon.css';
import PropTypes from 'prop-types';
import {
  Button, ButtonGroup, Card, Dropdown, FormControl, InputGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const capture = () => (
  console.log('capture()')
);

const captureAndDownload = () => (
  console.log('captureAndDownload()')
);

const CaptureButton = () => (
  <Dropdown as={ButtonGroup}>
    <Button onClick={capture}>
      <FontAwesomeIcon icon="magic" />
      {' '}
      Capture
    </Button>
    <Dropdown.Toggle split />
    <Dropdown.Menu>
      <Dropdown.Item eventKey="1">
        <Button type="link" onClick={captureAndDownload}>
          <FontAwesomeIcon icon="download" />
          {' '}
          Capture & Download
        </Button>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

const CustomInput = ({ prepend, value, append }) => (
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text>{prepend}</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl aria-label="icon" value={value} />
    <InputGroup.Append>
      <InputGroup.Text>
        {append}
      </InputGroup.Text>
    </InputGroup.Append>
  </InputGroup>
);
CustomInput.propTypes = {
  prepend: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  append: PropTypes.string.isRequired,
};

const IconInput = () => (
  <CustomInput prepend="Icon" value="fa-paw" append={<FontAwesomeIcon icon="paw" />} />
);

const ColorInput = () => (
  <CustomInput prepend="Color" value="#333333" append={<FontAwesomeIcon icon="palette" />} />
);

const SizeInput = () => (
  <CustomInput prepend="Size" value="15" append="px" />
);

const ConfigureIcon = () => (
  <Card className="ConfigureIcon">
    <Card.Header>Configure icon</Card.Header>
    <Card.Body>
      <IconInput />
      <ColorInput />
      <SizeInput />
      <CaptureButton />
    </Card.Body>
  </Card>
);

export default ConfigureIcon;
