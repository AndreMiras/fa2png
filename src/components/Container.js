import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = () => (
  <div className="container theme-showcase" role="main">
    <div className="row">
      <div className="col-md-3">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Configure icon</h3>
          </div>
          <div className="panel-body">
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon left">Icon</span>
                <input data-placement="bottomRight" className="form-control iconpicker" value="fa-paw" type="text" />
                <span className="input-group-addon picker-component-selector right" />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group colorpicker-component">
                <span className="input-group-addon left">Color</span>
                <input className="form-control" value="#333333" type="text" />
                <span className="input-group-addon picker-component-selector right"><i /></span>
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon left">Size</span>
                <input id="font-input" className="form-control" value="15" type="text" />
                <span className="input-group-addon right">px</span>
              </div>
              <div className="size-slider" style={{ width: '100%' }} />
            </div>
            <div className="btn-group">
              <button type="button" className="btn btn-default" onClick="capture()">
                <FontAwesomeIcon icon="magic" />
                {' '}
                Capture
              </button>
              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="caret" />
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a href="#" onClick="capture_and_download()">
                    <FontAwesomeIcon icon="download" />
                    {' '}
                    Capture & Download
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
