import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomInput from './CustomInput';

describe('CustomInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders prepend label', () => {
    render(<CustomInput onChange={mockOnChange} prepend="Label" value="test value" />);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('renders input with correct value', () => {
    render(<CustomInput onChange={mockOnChange} prepend="Label" value="test value" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test value');
  });

  it('calls onChange when input value changes', () => {
    const onChange = jest.fn();
    render(<CustomInput onChange={onChange} prepend="Label" value="test value" />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(onChange).toHaveBeenCalledWith('new value');
  });

  it('renders appendText when provided', () => {
    render(
      <CustomInput onChange={mockOnChange} prepend="Label" value="test value" appendText="px" />,
    );
    expect(screen.getByText('px')).toBeInTheDocument();
  });

  it('renders custom append element when provided', () => {
    const customAppend = <button type="button">Custom Button</button>;
    render(
      <CustomInput onChange={mockOnChange} prepend="Label" value="test value" append={customAppend} />,
    );
    expect(screen.getByText('Custom Button')).toBeInTheDocument();
  });

  it('prefers custom append over appendText', () => {
    const customAppend = <button type="button">Custom</button>;
    render(
      <CustomInput
        onChange={mockOnChange}
        prepend="Label"
        value="test value"
        append={customAppend}
        appendText="px"
      />,
    );
    expect(screen.getByText('Custom')).toBeInTheDocument();
    expect(screen.queryByText('px')).not.toBeInTheDocument();
  });

  it('has correct aria-label on input', () => {
    render(<CustomInput onChange={mockOnChange} prepend="Label" value="test value" />);
    const input = screen.getByLabelText('icon');
    expect(input).toBeInTheDocument();
  });
});
