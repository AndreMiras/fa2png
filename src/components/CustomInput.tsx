import type { ReactNode } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import type { CustomInputProps } from '../types';

interface AppendProps {
  children: ReactNode;
}

const Append = ({ children }: AppendProps) => (
  <InputGroup.Text>
    {children}
  </InputGroup.Text>
);

const CustomInput = ({
  onChange,
  prepend,
  value,
  append = null,
  appendText = null,
}: CustomInputProps) => (
  <InputGroup className="mb-3">
    <InputGroup.Text>{prepend}</InputGroup.Text>
    <FormControl aria-label="icon" value={value} onChange={(e) => onChange(e.target.value)} />
    {append == null && appendText != null ? <Append>{appendText}</Append> : append}
  </InputGroup>
);

export default CustomInput;
