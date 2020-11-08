import React from 'react';
import { Col, Container as ReactContainer, Row } from 'react-bootstrap';
import ConfigureIcon from './ConfigureIcon';
import IconPreview from './IconPreview';

const Container = () => (
  <ReactContainer>
    <Row>
      <Col xs={3}>
        <ConfigureIcon />
      </Col>
      <Col xs={9}>
        <IconPreview />
      </Col>
    </Row>
  </ReactContainer>
);

export default Container;
