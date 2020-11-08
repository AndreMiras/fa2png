import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconPreview = () => (
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title">Icon preview</h3>
    </div>
    <div className="panel-body">
      <div className="text-center" id="icon-canvas">
        <FontAwesomeIcon id="icon-target" icon="download" size="5x" />
      </div>
    </div>
  </div>
);

export default IconPreview;
