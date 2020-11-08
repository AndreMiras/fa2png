import React from 'react';
import ConfigureIcon from './ConfigureIcon';
import IconPreview from './IconPreview';

const Container = () => (
  <div className="container theme-showcase" role="main">
    <div className="row">

      <div className="col-md-3">
        <ConfigureIcon />
      </div>

      <div className="col-md-9">
        <IconPreview />
      </div>
    </div>
  </div>
);

export default Container;
