import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';

const IconPreview = () => (
  <Card>
    <Card.Header>Icon preview</Card.Header>
    <Card.Body>
      <div id="icon-canvas" className="text-center">
        <FontAwesomeIcon id="icon-target" icon="paw" size="5x" />
      </div>
    </Card.Body>
  </Card>
);

export default IconPreview;
