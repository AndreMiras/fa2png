import { HexColorPicker } from 'react-colorful';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import CustomInput from './CustomInput';
import type { InputComponentProps } from '../types';

const customPopover = (onChange: (value: string) => void, value: string) => (
  <Popover>
    <Popover.Header as="h3">Color</Popover.Header>
    <Popover.Body>
      <HexColorPicker color={value} onChange={onChange} />
    </Popover.Body>
  </Popover>
);

interface AppendProps {
  onChange: (value: string) => void;
  value: string;
}

const Append = ({ onChange, value }: AppendProps) => (
  <OverlayTrigger
    trigger="click"
    placement="right"
    transition={false}
    rootClose
    overlay={customPopover(onChange, value)}
  >
    <Button variant="outline-secondary">
      <FontAwesomeIcon icon="palette" />
    </Button>
  </OverlayTrigger>
);

const ColorInput = ({ onChange, value }: InputComponentProps) => (
  <CustomInput
    onChange={onChange}
    prepend="Color"
    value={value}
    append={<Append onChange={onChange} value={value} />}
  />
);

export default ColorInput;
