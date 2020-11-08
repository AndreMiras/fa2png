import { Container as ReactContainer } from 'react-bootstrap';

const Container = () => (
  <ReactContainer className="container theme-showcase" role="main">
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
                <span className="input-group-addon picker-component-selector right"></span>
              </div>
            </div>
            <div className="form-group">
              <div className="input-group colorpicker-component">
                <span className="input-group-addon left">Color</span>
                <input className="form-control" value="#333333" type="text" />
                <span className="input-group-addon picker-component-selector right"><i></i></span>
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon left">Size</span>
                <input id="font-input" className="form-control" value="15" type="text" />
                <span className="input-group-addon right">px</span>
              </div>
              <div className="size-slider" style={{ width: "100%" }}></div>
            </div>
            <div className="btn-group">
                <button type="button" className="btn btn-default" onclick="capture()"><i className="fa fa-magic"></i> Capture</button>
              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="caret"></span>
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a href="#" onclick="capture_and_download()"><i className="fa fa-download"></i> Capture & Download</a>
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
              <i id="icon-target" className="fa fa-paw fa-5x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ReactContainer>
);

export default Container;
