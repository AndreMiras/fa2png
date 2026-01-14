import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconName } from '@fortawesome/fontawesome-svg-core';
import { Card } from 'react-bootstrap';
import type { IconPreviewProps } from '../types';

const IconPreview = ({ icon, size, color }: IconPreviewProps) => (
  <Card>
    <Card.Header>Icon preview</Card.Header>
    <Card.Body>
      <div id="icon-canvas" className="text-center">
        <FontAwesomeIcon
          id="icon-target"
          icon={icon as IconName}
          style={{ fontSize: `${size}px`, color }}
        />
      </div>
    </Card.Body>
  </Card>
);

export default IconPreview;
