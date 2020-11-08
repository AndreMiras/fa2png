import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConfigureIcon from './ConfigureIcon';

const Container = () => (
  <div className="container theme-showcase" role="main">
    <div className="row">

      <div className="col-md-3">
        <ConfigureIcon />
      </div>

      <div className="col-md-9">
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
      </div>
    </div>
  </div>
);

export default Container;
