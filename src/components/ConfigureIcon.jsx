import React from 'react';
import './ConfigureIcon.css';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import CaptureButton from './CaptureButton';
import IconInput from './IconInput';
import ColorInput from './ColorInput';
import SizeInputWithSlider from './SizeInputWithSlider';

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
