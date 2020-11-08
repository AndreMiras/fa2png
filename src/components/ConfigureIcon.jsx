import React from 'react';
import './ConfigureIcon.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import domtoimage from 'dom-to-image';
import PropTypes from 'prop-types';
import {
  Button, ButtonGroup, Card, Col, Dropdown, FormControl, InputGroup, Row,
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

const CustomInput = ({
  onChange, prepend, value, append,
}) => (
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text>{prepend}</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl aria-label="icon" value={value} onChange={(e) => onChange(e.target.value)} />
    <InputGroup.Append>
      <InputGroup.Text>
        {append}
      </InputGroup.Text>
    </InputGroup.Append>
  </InputGroup>
);
CustomInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  prepend: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
  value: PropTypes.string.isRequired,
  append: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};

const IconInput = ({ onChange, value }) => (
  <CustomInput onChange={onChange} prepend="Icon" value={value} append={<FontAwesomeIcon icon="paw" />} />
);
IconInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const ColorInput = ({ onChange, value }) => (
  <CustomInput onChange={onChange} prepend="Color" value={value} append={<FontAwesomeIcon icon="palette" />} />
);
ColorInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const SizeInput = ({ onChange, value }) => (
  <CustomInput onChange={onChange} prepend="Size" value={value.toString()} append="px" />
);
SizeInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

const CustomSlider = ({ onChange, value }) => (
  <Row>
    <Col className="mb-3">
      <Slider onChange={onChange} value={value} max={500} />
    </Col>
  </Row>
);
CustomSlider.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

const SizeInputWithSlider = ({ onChange, value }) => (
  <>
    <SizeInput onChange={onChange} value={value} />
    <CustomSlider onChange={onChange} value={value} />
  </>
);
SizeInputWithSlider.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

const ConfigureIcon = ({
  onIconChange, iconValue, onColorChange, colorValue, onSizeChange, sizeValue,
}) => (
  <Card className="ConfigureIcon">
    <Card.Header>Configure icon</Card.Header>
    <Card.Body>
      <IconInput onChange={onIconChange} value={iconValue} />
      <ColorInput onChange={onColorChange} value={colorValue} />
      <SizeInputWithSlider onChange={onSizeChange} value={sizeValue} />
      <CaptureButton />
    </Card.Body>
  </Card>
);
ConfigureIcon.propTypes = {
  onIconChange: PropTypes.func.isRequired,
  iconValue: PropTypes.string.isRequired,
  onColorChange: PropTypes.func.isRequired,
  colorValue: PropTypes.string.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  sizeValue: PropTypes.number.isRequired,
};

export default ConfigureIcon;
