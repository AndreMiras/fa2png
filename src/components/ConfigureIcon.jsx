import React from 'react';
import {
  Button, ButtonGroup, Card, Dropdown,
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

const ConfigureIcon = () => (
  <Card>
    <Card.Header>Configure icon</Card.Header>
    <Card.Body>
      <div className="form-group">
        <div className="input-group">
          <span className="input-group-addon left">Icon</span>
          <input data-placement="bottomRight" className="form-control iconpicker" value="fa-paw" type="text" />
          <span className="input-group-addon picker-component-selector right" />
        </div>
      </div>
      <div className="form-group">
        <div className="input-group colorpicker-component">
          <span className="input-group-addon left">Color</span>
          <input className="form-control" value="#333333" type="text" />
          <span className="input-group-addon picker-component-selector right"><i /></span>
        </div>
      </div>
      <div className="form-group">
        <div className="input-group">
          <span className="input-group-addon left">Size</span>
          <input id="font-input" className="form-control" value="15" type="text" />
          <span className="input-group-addon right">px</span>
        </div>
        <div className="size-slider" style={{ width: '100%' }} />
      </div>
      <CaptureButton />
    </Card.Body>
  </Card>
);

export default ConfigureIcon;
