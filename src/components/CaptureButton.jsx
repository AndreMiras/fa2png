import React from 'react';
import domtoimage from 'dom-to-image';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*
 * Workaround for Chrome no longer aligning redirect from JS.
 * https://stackoverflow.com/a/45789588/185510
 */
const windowLocation = (base64URL) => {
  const win = window.open();
  win.document.write(
    `<iframe src="${base64URL}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`,
  );
  win.document.close();
};

const capture = (element) => {
  domtoimage.toPng(element)
    .then((dataUrl) => {
      windowLocation(dataUrl);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('oops, something went wrong!', error);
    });
};

const captureAndDownload = (element) => {
  domtoimage.toPng(element)
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'image.png';
      link.href = dataUrl;
      link.click();
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('oops, something went wrong!', error);
    });
};

const getIconCanvas = () => (
  document.getElementById('icon-canvas')
);

const CaptureButton = () => (
  <Dropdown as={ButtonGroup}>
    <Button onClick={() => capture(getIconCanvas())}>
      <FontAwesomeIcon icon="wand-magic" />
      {' '}
      Capture
    </Button>
    <Dropdown.Toggle split />
    <Dropdown.Menu>
      <Dropdown.Item eventKey="1">
        <Button variant="link" onClick={() => captureAndDownload(getIconCanvas())}>
          <FontAwesomeIcon icon="download" />
          {' '}
          Capture & Download
        </Button>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default CaptureButton;
