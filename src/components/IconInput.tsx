import { OverlayTrigger, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconName } from '@fortawesome/fontawesome-svg-core';
import CustomInput from './CustomInput';
import IconPicker from './IconPicker';
import type { InputComponentProps } from '../types';

interface RenderOverlayProps {
  onChange: (value: string) => void;
}

const renderOverlay = ({ onChange }: RenderOverlayProps) => (
  <IconPicker onChange={onChange} />
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
    overlay={renderOverlay({ onChange })}
  >
    <Button variant="outline-secondary">
      <FontAwesomeIcon icon={value as IconName} />
    </Button>
  </OverlayTrigger>
);

const IconInput = ({ onChange, value }: InputComponentProps) => (
  <CustomInput
    onChange={onChange}
    prepend="Icon"
    value={value}
    append={<Append onChange={onChange} value={value} />}
  />
);

export default IconInput;
