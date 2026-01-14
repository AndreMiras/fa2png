import domtoimage from 'dom-to-image';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const windowLocation = (base64URL: string): void => {
  const win = window.open();
  if (win) {
    win.document.write(
      `<iframe src="${base64URL}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`,
    );
    win.document.close();
  }
};

const capture = (element: HTMLElement): void => {
  domtoimage.toPng(element)
    .then((dataUrl) => {
      windowLocation(dataUrl);
    })
    .catch((error) => {
      console.error('oops, something went wrong!', error);
    });
};

const captureAndDownload = (element: HTMLElement): void => {
  domtoimage.toPng(element)
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'image.png';
      link.href = dataUrl;
      link.click();
    })
    .catch((error) => {
      console.error('oops, something went wrong!', error);
    });
};

const getIconCanvas = (): HTMLElement | null => (
  document.getElementById('icon-canvas')
);

const CaptureButton = () => (
  <Dropdown as={ButtonGroup}>
    <Button onClick={() => {
      const canvas = getIconCanvas();
      if (canvas) capture(canvas);
    }}>
      <FontAwesomeIcon icon="wand-magic" />
      {' '}
      Capture
    </Button>
    <Dropdown.Toggle split />
    <Dropdown.Menu>
      <Dropdown.Item eventKey="1">
        <Button variant="link" onClick={() => {
          const canvas = getIconCanvas();
          if (canvas) captureAndDownload(canvas);
        }}>
          <FontAwesomeIcon icon="download" />
          {' '}
          Capture & Download
        </Button>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default CaptureButton;
