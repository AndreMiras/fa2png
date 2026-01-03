import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import CustomInput from './CustomInput';

const SizeInput = ({ onChange, value }) => (
  <CustomInput
    onChange={(val) => onChange(Number(val) || 0)}
    prepend="Size"
    value={value.toString()}
    appendText="px"
  />
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

export default SizeInputWithSlider;
