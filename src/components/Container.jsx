import React, { useState } from 'react';
import { Col, Container as ReactContainer, Row } from 'react-bootstrap';
import ConfigureIcon from './ConfigureIcon';
import IconPreview from './IconPreview';

const Container = () => {
  const [iconProperties, setIconProperties] = useState({
    icon: 'paw',
    color: '#333333',
    size: '100',
  });
  const onIconChange = (icon) => (
    setIconProperties({ ...iconProperties, icon })
  );
  const onColorChange = (color) => (
    setIconProperties({ ...iconProperties, color })
  );
  const onSizeChange = (size) => (
    setIconProperties({ ...iconProperties, size })
  );

  return (
    <ReactContainer>
      <Row>
        <Col xs={3}>
          <ConfigureIcon
            onIconChange={onIconChange}
            iconValue={iconProperties.icon}
            onColorChange={onColorChange}
            colorValue={iconProperties.color}
            onSizeChange={onSizeChange}
            sizeValue={iconProperties.size}
          />
        </Col>
        <Col xs={9}>
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
