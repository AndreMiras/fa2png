import React from 'react';
import './ConfigureIcon.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CaptureButton from './CaptureButton';
import CustomInput from './CustomInput';

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
