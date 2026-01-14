import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Col, Row } from 'react-bootstrap';
import CustomInput from './CustomInput';
import type { SizeInputProps } from '../types';

const SizeInput = ({ onChange, value }: SizeInputProps) => (
  <CustomInput
    onChange={(val) => onChange(Number(val) || 0)}
    prepend="Size"
    value={value.toString()}
    appendText="px"
  />
);

const CustomSlider = ({ onChange, value }: SizeInputProps) => (
  <Row>
    <Col className="mb-3">
      <Slider onChange={(val) => onChange(val as number)} value={value} max={500} />
    </Col>
  </Row>
);

const SizeInputWithSlider = ({ onChange, value }: SizeInputProps) => (
  <>
    <SizeInput onChange={onChange} value={value} />
    <CustomSlider onChange={onChange} value={value} />
  </>
);

export default SizeInputWithSlider;
