import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SizeInputWithSlider from './SizeInputWithSlider';

describe('SizeInputWithSlider', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders size label', () => {
    render(<SizeInputWithSlider onChange={mockOnChange} value={100} />);
    expect(screen.getByText('Size')).toBeInTheDocument();
  });

  it('renders px unit', () => {
    render(<SizeInputWithSlider onChange={mockOnChange} value={100} />);
    expect(screen.getByText('px')).toBeInTheDocument();
  });

  it('displays current value in input', () => {
    render(<SizeInputWithSlider onChange={mockOnChange} value={150} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('150');
  });

  it('calls onChange when input value changes', () => {
    const onChange = jest.fn();
    render(<SizeInputWithSlider onChange={onChange} value={100} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '200' } });

    expect(onChange).toHaveBeenCalledWith(200);
  });

  it('renders slider component', () => {
    const { container } = render(<SizeInputWithSlider onChange={mockOnChange} value={100} />);
    const slider = container.querySelector('.rc-slider');
    expect(slider).toBeInTheDocument();
  });

  it('updates when value prop changes', () => {
    const { rerender } = render(<SizeInputWithSlider onChange={mockOnChange} value={100} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('100');

    rerender(<SizeInputWithSlider onChange={mockOnChange} value={250} />);
    expect(input).toHaveValue('250');
  });
});
