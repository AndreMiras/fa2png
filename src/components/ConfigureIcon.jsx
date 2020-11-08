import React from 'react';
import './ConfigureIcon.css';
import domtoimage from 'dom-to-image';
import PropTypes from 'prop-types';
import {
  Button, ButtonGroup, Card, Dropdown, FormControl, InputGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*
 * Workaround for Chrome no longer aligning redirect from JS.
 * https://stackoverflow.com/a/45789588/185510
 */
const windowLocation = (base64URL) => {
  const win = window.open();
  win.document.write(
    `<iframe src="${base64URL}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`,
  );
  win.document.close();
};

const capture = (element) => {
  domtoimage.toPng(element)
    .then((dataUrl) => {
      windowLocation(dataUrl);
    })
    .catch((error) => {
      console.error('oops, something went wrong!', error);
    });
};

const captureAndDownload = (element) => {
  domtoimage.toPng(element)
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'image.png';
      link.href = dataUrl;
      link.click();
    })
    .catch((error) => {
      console.error('oops, something went wrong!', error);
    });
};

const getIconCanvas = () => (
  document.getElementById('icon-canvas')
);

const CaptureButton = () => (
  <Dropdown as={ButtonGroup}>
    <Button onClick={() => capture(getIconCanvas())}>
      <FontAwesomeIcon icon="magic" />
      {' '}
      Capture
    </Button>
    <Dropdown.Toggle split />
    <Dropdown.Menu>
      <Dropdown.Item eventKey="1">
        <Button variant="link" onClick={() => captureAndDownload(getIconCanvas())}>
          <FontAwesomeIcon icon="download" />
          {' '}
          Capture & Download
        </Button>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

const CustomInput = ({ prepend, defaultValue, append }) => (
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text>{prepend}</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl aria-label="icon" defaultValue={defaultValue} />
    <InputGroup.Append>
      <InputGroup.Text>
        {append}
      </InputGroup.Text>
    </InputGroup.Append>
  </InputGroup>
);
CustomInput.propTypes = {
  prepend: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
  defaultValue: PropTypes.string.isRequired,
  append: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};

const IconInput = () => (
  <CustomInput prepend="Icon" defaultValue="fa-paw" append={<FontAwesomeIcon icon="paw" />} />
);

const ColorInput = () => (
  <CustomInput prepend="Color" defaultValue="#333333" append={<FontAwesomeIcon icon="palette" />} />
);

const SizeInput = () => (
  <CustomInput prepend="Size" defaultValue="15" append="px" />
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
