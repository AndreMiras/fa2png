import React, { useState } from 'react';
import { Col, Container as ReactContainer, Row } from 'react-bootstrap';
import ConfigureIcon from './ConfigureIcon';
import IconPreview from './IconPreview';

const Container = () => {
  const [iconProperties, setIconProperties] = useState({
    icon: 'paw',
    color: '#333333',
    size: 100,
  });
  const onChange = (property) => (value) => (
    setIconProperties({ ...iconProperties, [property]: value })
  );
  return (
    <ReactContainer>
      <Row>
        <Col md={5} lg={4}>
          <ConfigureIcon
            onIconChange={onChange('icon')}
            iconValue={iconProperties.icon}
            onColorChange={onChange('color')}
            colorValue={iconProperties.color}
            onSizeChange={onChange('size')}
            sizeValue={iconProperties.size}
          />
        </Col>
        <Col md={7} lg={8}>
          <IconPreview
            icon={iconProperties.icon}
            color={iconProperties.color}
            size={iconProperties.size}
          />
        </Col>
      </Row>
    </ReactContainer>
  );
};

export default Container;
