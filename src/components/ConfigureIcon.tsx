import './ConfigureIcon.css';
import { Card } from 'react-bootstrap';
import CaptureButton from './CaptureButton';
import IconInput from './IconInput';
import ColorInput from './ColorInput';
import SizeInputWithSlider from './SizeInputWithSlider';
import type { ConfigureIconProps } from '../types';

const ConfigureIcon = ({
  onIconChange, iconValue, onColorChange, colorValue, onSizeChange, sizeValue,
}: ConfigureIconProps) => (
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

export default ConfigureIcon;
