import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import ColorInput from './ColorInput';

// Add FontAwesome icons to library
library.add(fas);

describe('ColorInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders color label', () => {
    render(<ColorInput onChange={mockOnChange} value="#333333" />);
    expect(screen.getByText('Color')).toBeInTheDocument();
  });

  it('displays current color value in input', () => {
    render(<ColorInput onChange={mockOnChange} value="#ff0000" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('#ff0000');
  });

  it('renders palette button', () => {
    render(<ColorInput onChange={mockOnChange} value="#333333" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const onChange = jest.fn();
    render(<ColorInput onChange={onChange} value="#333333" />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '#00ff00' } });

    expect(onChange).toHaveBeenCalledWith('#00ff00');
  });

  it('shows color picker popover when button clicked', () => {
    render(<ColorInput onChange={mockOnChange} value="#333333" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // ChromePicker renders "Color" title in popover
    const popoverTitle = screen.getAllByText('Color');
    expect(popoverTitle.length).toBeGreaterThan(1); // Original label + popover title
  });

  it('updates when value prop changes', () => {
    const { rerender } = render(<ColorInput onChange={mockOnChange} value="#111111" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('#111111');

    rerender(<ColorInput onChange={mockOnChange} value="#222222" />);
    expect(input).toHaveValue('#222222');
  });
});
